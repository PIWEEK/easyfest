<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import { browser } from '$app/environment';
	import * as m from '$lib/paraglide/messages.js';
	import { writable } from 'svelte/store';

	import ActivityCard from './ActivityCard.svelte';
	import ActivityFiller from './ActivityFiller.svelte';
	import { formatActivityHour, formatActivityDate } from '$lib/agendaTime.js';

	let { data } = $props();
	let { agenda } = data;

	// El botón "Agenda en PDF" solo se muestra si la editora ha marcado el
	// campo `content` de la agenda (Strapi) con el texto #PDF. Ese texto es
	// solo una marca de control: no se imprime en la web en ningún sitio.
	const showPdfButton = (agenda?.content ?? '').includes('#PDF');

	// Set this to true to show a compact agenda for debugging
	const debugMode = false;

	let current_day = $state.raw(data.days?.length > 0 ? data.days[0] : null);

	// Zoom de la agenda: solo afecta al tamaño visual de la tabla (vía CSS
	// `zoom`), no a los cálculos de horario/duración.
	const ZOOM_MIN = 50;
	const ZOOM_MAX = 150;
	const ZOOM_STEP = 10;
	let zoomLevel = $state(100);

	function zoomIn() {
		zoomLevel = Math.min(ZOOM_MAX, zoomLevel + ZOOM_STEP);
	}

	function zoomOut() {
		zoomLevel = Math.max(ZOOM_MIN, zoomLevel - ZOOM_STEP);
	}
	let container = $state();
	let columnsContainer;
	let containerWidth = $state();

	function handleDayClick(day) {
		current_day = day;
		tick().then(() => {
			handleResize();
		});
	}

	function formatDayLabel(day) {
		const date = new Date(day.year, day.month, day.date);
		const weekday = date.toLocaleDateString('es-ES', { weekday: 'long' });
		const dayMonth = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
		return `${weekday} ${dayMonth}`;
	}

	function minutesBetween(start, end) {
		if (end > start) {
			return (end - start) / 1000 / 60;
		}
		return 0;
	}

	function startDate(activity) {
		return new Date(activity.start);
	}

	function endDate(activity) {
		return new Date(startDate(activity).getTime() + activity.minutes * 60 * 1000);
	}

	function adjustStartDate(activity) {
		const adjust = activity.adjust_start || 0;
		return new Date(startDate(activity).getTime() - adjust * 60 * 1000);
	}

	// TODO: move this into the database in Strapi
	const compressedIntervals = [
		[new Date('2025-05-08T21:00:00'), new Date('2025-05-08T22:30:00')],
		[new Date('2025-05-09T08:00:00'), new Date('2025-05-09T10:00:00')],
		[new Date('2025-05-09T13:30:00'), new Date('2025-05-09T15:30:00')],
		[new Date('2025-05-09T21:00:00'), new Date('2025-05-09T22:30:00')],
		[new Date('2025-05-10T08:00:00'), new Date('2025-05-10T10:00:00')],
		[new Date('2025-05-10T13:30:00'), new Date('2025-05-10T15:30:00')],
		[new Date('2025-05-10T22:00:00'), new Date('2025-05-11T00:00:00')],
		[new Date('2025-05-11T09:00:00'), new Date('2025-05-11T11:00:00')],
		[new Date('2025-05-11T11:00:00'), new Date('2025-05-11T13:30:00')],
		[new Date('2025-05-11T13:30:00'), new Date('2025-05-11T15:30:00')]
	];

	/**
	 * Calculate the number of minutes between the start and end of an item
	 * (an activity or an adjust), but compressing the time located inside
	 * any of the compressedIntervals above.
	 */
	function compressMinutes(itemStart, itemEnd, factor) {
		let minutes = 0;

		compressedIntervals.forEach(([intervalStart, intervalEnd], i) => {
			const currentStart =
				i === 0 ? itemStart : new Date(Math.max(itemStart, compressedIntervals[i - 1][1]));
			const currentEnd =
				i === compressedIntervals.length - 1
					? itemEnd
					: new Date(Math.min(itemEnd, compressedIntervals[i][1]));

			const before = minutesBetween(
				Math.min(currentStart, intervalStart),
				Math.min(intervalStart, currentEnd)
			);
			const during = minutesBetween(
				Math.max(currentStart, intervalStart),
				Math.min(currentEnd, intervalEnd)
			);
			const after = minutesBetween(
				Math.max(intervalEnd, currentStart),
				Math.max(intervalEnd, currentEnd)
			);

			minutes += before + during / factor + after;
		});

		return minutes;
	}

	function activityHeight(activity) {
		const minutes = compressMinutes(startDate(activity), endDate(activity), 7);
		return (minutes * 0.3 - 2).toString() + 'rem';
	}

	function activityHeightDebug(activity) {
		const minutes = compressMinutes(startDate(activity), endDate(activity), 2, activity);
		return (minutes * 2).toString() + 'px';
	}

	function activityAdjust(activity) {
		const minutes = compressMinutes(startDate(activity), adjustStartDate(activity), 7);
		if (minutes !== 0) {
			return (-minutes * 0.3).toString() + 'rem';
		}
	}

	function activityAdjustDebug(activity) {
		const minutes = compressMinutes(startDate(activity), adjustStartDate(activity), 2);
		return (-minutes * 2).toString() + 'px';
	}

	/**
	 * Last moment of activity in the day, to know where the hour guide should stop.
	 */
	function dayEnd(day) {
		let end = day.start;
		for (const track of day.tracks) {
			for (const activity of track.activities) {
				if (activity.is_filler) continue;
				const activityEnd = endDate(activity);
				if (activityEnd > end) {
					end = activityEnd;
				}
			}
		}
		return end;
	}

	/**
	 * Hour marks (label + vertical offset) for the day's time guide, using the
	 * same compressed time scale (factor 7, 0.3rem/minute) as activityHeight/
	 * activityAdjust, so it lines up with the tracks without touching their logic.
	 */
	// Espacio ocupado por la cabecera de sala (.column-header: height 6rem fija
	// + margin-bottom 0.625rem) antes de que empiece a apilarse la primera
	// actividad/filler de cada columna.
	const TRACKS_TOP_OFFSET_REM = 6.625;

	function hourMarks(day) {
		if (!day) return [];
		const end = dayEnd(day);
		const marks = [];
		let cursor = new Date(day.start);
		cursor.setMinutes(0, 0, 0);
		if (cursor < day.start) {
			cursor = new Date(cursor.getTime() + 60 * 60 * 1000);
		}
		while (cursor <= end) {
			const minutesOffset = compressMinutes(day.start, cursor, 7) * 0.3;
			marks.push({
				label: formatActivityHour(cursor),
				offset: (TRACKS_TOP_OFFSET_REM + minutesOffset).toString() + 'rem'
			});
			cursor = new Date(cursor.getTime() + 60 * 60 * 1000);
		}
		return marks;
	}

	function handleResize() {
		containerWidth = columnsContainer.scrollWidth - 12;
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('resize', handleResize);
			handleResize();
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('resize', handleResize);
		}
	});

	let scrollContainer;
	const showLeftArrow = writable(false);
	const showRightArrow = writable(false);
	const arrowsVisibleOnHover = writable(false);

	function activityHour(activity) {
		return formatActivityHour(activity.start);
	}

	function updateArrows() {
		if (scrollContainer && columnsContainer) {
			showLeftArrow.set(scrollContainer.scrollLeft > 0);
			showRightArrow.set(
				columnsContainer.offsetWidth > scrollContainer.clientWidth &&
					scrollContainer.scrollLeft < columnsContainer.offsetWidth - scrollContainer.clientWidth
			);
		} else {
			showLeftArrow.set(false);
			showRightArrow.set(false);
		}
	}
	function handleMouseEnter() {
		arrowsVisibleOnHover.set(true);
	}

	function handleMouseLeave() {
		arrowsVisibleOnHover.set(false);
	}
	onMount(() => {
		if (scrollContainer && columnsContainer) {
			updateArrows();
			scrollContainer.addEventListener('scroll', updateArrows);
			window.addEventListener('resize', updateArrows);
		}
	});
	onDestroy(() => {
		if (browser) {
			window.removeEventListener('resize', handleResize);
		}
	});
</script>

<section class="hero page-title agenda-hero">
	<h3 class="title">{m.agenda()}</h3>
</section>
<section class="section agenda-section">
	<div class="container" bind:this={container}>
		<div class="content" style="--agenda-zoom: {zoomLevel}%">
			<p class="agenda-timezone-notice">
				Todos los horarios se muestran en hora peninsular española (Murcia).
			</p>

			<div class="agenda-toolbar">
				{#if agenda.mode !== 'all-days'}
					<div class="tabs is-toggle is-fullwidth">
						<ul>
							{#each data.days as day}
								<li class:is-active={day === current_day}>
									<a onclick={() => handleDayClick(day)}>
										{formatDayLabel(day)}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<div class="agenda-zoom-controls" role="group" aria-label="Zoom de la agenda">
					<button
						type="button"
						class="agenda-zoom-button"
						onclick={zoomOut}
						disabled={zoomLevel <= ZOOM_MIN}
						aria-label="Reducir zoom"
					>
						−
					</button>
					<span class="agenda-zoom-level">Zoom {zoomLevel}%</span>
					<button
						type="button"
						class="agenda-zoom-button"
						onclick={zoomIn}
						disabled={zoomLevel >= ZOOM_MAX}
						aria-label="Aumentar zoom"
					>
						+
					</button>
				</div>
			</div>

			{#if debugMode}
				<div style="display: grid; grid-template-columns: repeat(8, 1fr); border: 1px solid black;">
					{#if current_day}
						{#each current_day.tracks as track}
							{#if track.activities.length > 0}
								<div style="display:flex; flex-direction: column;">
									<p
										style="background-color: var(--bulma-primary); color: white; margin: 0; padding: 8px; font-size: 85%"
									>
										{track.title}
									</p>
									{#each track.activities as activity}
										{#if activity.is_filler}
											<p
												style="font-size: 85%; background-color: white; margin: 0; padding: 8px; border: 1px solid grey; height: {activityHeightDebug(
													activity
												)}; margin-top: {activityAdjustDebug(activity)};"
												title={activity.title}
											>
												{activityHour(activity)} <strong>{activity.minutes}</strong>
												{activity.title && activity.title.substr(0, 10)}<br />
												<span style="font-size: 70%"
													>{compressMinutes(startDate(activity), endDate(activity), 2)}</span
												>
											</p>
										{:else}
											<p
												style="font-size: 85%; background-color: rgb(222, 235, 220); margin: 0; padding: 8px; border: 1px solid grey; height: {activityHeightDebug(
													activity
												)}; margin-top: {activityAdjustDebug(activity)};"
												title={activity.title}
											>
												{activityHour(activity)} <strong>{activity.minutes}</strong>
												{activity.title.substr(0, 10)}<br />
												<span style="font-size: 70%"
													>{compressMinutes(startDate(activity), endDate(activity), 2)}</span
												>
											</p>
										{/if}
									{/each}
								</div>
							{/if}
						{/each}
					{/if}
				</div>
			{/if}

			{#if agenda.mode === 'all-days'}
				{#each data.days as day}
					<div class="agenda-table" style="margin-bottom:2rem;">
						<h4 class="title is-size-5">{formatDayLabel(day)}</h4>
						<div class="time-gutter" aria-hidden="true">
							{#each hourMarks(day) as mark}
								<span class="time-gutter__mark" style="top: {mark.offset}">{mark.label}</span>
							{/each}
						</div>
						<div
							class="columns is-1 is-mobile"
							bind:this={columnsContainer}
							onmouseenter={handleMouseEnter}
							onmouseleave={handleMouseLeave}
						>
							{#each day.tracks as track}
								{#if track.activities.length > 0}
									<div class="column is-half-mobile is-half-tablet is-one-quarter-desktop">
										<div class="column-header">
											<h4 class="title has-text-white is-size-6-mobile">{track.title}</h4>
											<p class="subtitle has-text-grey-light is-size-7-mobile">
												{track.description}
											</p>
										</div>
										{#each track.activities as activity}
											{#if activity.is_filler}
												<ActivityFiller
													{activity}
													height={activityHeight(activity)}
													adjust={activityAdjust(activity)}
													hideInMobile={true}
												/>
											{:else if !activity.is_across_tracks}
												<ActivityCard
													{activity}
													height={activityHeight(activity)}
													adjust={activityAdjust(activity)}
												/>
											{:else}
												<div class="activity-wrapper">
													<ActivityFiller
														{activity}
														height={activityHeight(activity)}
														adjust={activityAdjust(activity)}
													/>
													<div class="column-extender" style="width: {containerWidth}px">
														<ActivityCard
															{activity}
															height={activityHeight(activity)}
															adjust={activityAdjust(activity)}
														/>
													</div>
												</div>
											{/if}
										{/each}
									</div>
								{/if}
							{/each}
						</div>
					</div>
				{/each}
			{:else}
				<div class="agenda-table" bind:this={scrollContainer}>
					{#if current_day}
						<div class="time-gutter" aria-hidden="true">
							{#each hourMarks(current_day) as mark}
								<span class="time-gutter__mark" style="top: {mark.offset}">{mark.label}</span>
							{/each}
						</div>
					{/if}
					<div
						class="columns is-1 is-mobile"
						bind:this={columnsContainer}
						onmouseenter={handleMouseEnter}
						onmouseleave={handleMouseLeave}
					>
						{#if current_day}
							{#each current_day.tracks as track}
								{#if track.activities.length > 0}
									<div class="column is-half-mobile is-half-tablet is-one-quarter-desktop">
										<div class="column-header">
											<h4 class="title has-text-white is-size-6-mobile">{track.title}</h4>
											<p class="subtitle has-text-grey-light is-size-7-mobile">
												{track.description}
											</p>
										</div>
										{#each track.activities as activity}
											{#if activity.is_filler}
												<ActivityFiller
													{activity}
													height={activityHeight(activity)}
													adjust={activityAdjust(activity)}
													hideInMobile={true}
												/>
											{:else if !activity.is_across_tracks}
												<ActivityCard
													{activity}
													height={activityHeight(activity)}
													adjust={activityAdjust(activity)}
												/>
											{:else}
												<div class="activity-wrapper">
													<ActivityFiller
														{activity}
														height={activityHeight(activity)}
														adjust={activityAdjust(activity)}
													/>
													<div class="column-extender" style="width: {containerWidth}px">
														<ActivityCard
															{activity}
															height={activityHeight(activity)}
															adjust={activityAdjust(activity)}
														/>
													</div>
												</div>
											{/if}
										{/each}
									</div>
								{/if}
							{/each}
						{/if}
					</div>
				</div>
			{/if}
			<div
				class="arrow arrow-left"
				class:visible={showLeftArrow}
				style:opacity={$arrowsVisibleOnHover || $showLeftArrow ? '0.8' : '0.3'}
			>
				<span class="icon">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<polyline points="15 6 9 12 15 18" />
					</svg>
				</span>
			</div>
			<div
				class="arrow arrow-right"
				class:visible={showRightArrow}
				style:opacity={$arrowsVisibleOnHover || $showRightArrow ? '0.8' : '0.3'}
			>
				<span class="icon">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<polyline points="9 6 15 12 9 18" />
					</svg>
				</span>
			</div>
		</div>
	</div>
</section>

{#if showPdfButton}
	<!-- Contenedor totalmente aparte de .agenda-section: no comparte ancestro con
	     .agenda-table/.columns, así que no puede afectar a su scroll ni al reparto
	     de columnas. -->
	<section class="section agenda-pdf-section">
		<div class="container has-text-centered">
			<a
				class="button is-primary agenda-pdf-button"
				href="https://e.sociedadtolkien.org/programaec26"
				target="_blank"
				rel="noreferrer"
			>
				<span class="icon">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
						<polyline points="14 2 14 8 20 8" />
						<line x1="9" y1="15" x2="15" y2="15" />
						<line x1="9" y1="11" x2="12" y2="11" />
					</svg>
				</span>
				<span>Agenda en PDF</span>
			</a>
		</div>
	</section>
{/if}

<style lang="scss">
	@use 'bulma/sass/utilities/mixins';

	/* Guía horaria a la izquierda de cada tabla de agenda. Se reserva el hueco
	   desplazando .columns explícitamente con left/width (en vez de depender de la
	   "posición estática" implícita de un padding, que es ambigua para hijos con
	   position:absolute) — así no hay dudas de dónde empieza cada cosa. El cálculo
	   de containerWidth se mide en vivo (scrollWidth), así que sigue siendo correcto
	   con el nuevo ancho disponible. */
	$gutter-width: 5rem;

	/* El zoom solo escala la tabla de la agenda (vía CSS `zoom`, no `transform`,
	   para que el scroll interno siga midiendo bien su contenido). No toca la
	   guía de horas ni el cálculo de duraciones: sigue siendo el mismo layout,
	   solo dibujado más grande o más pequeño. */
	:global(.agenda-table) {
		zoom: var(--agenda-zoom, 100%);
	}

	.agenda-timezone-notice {
		text-align: left;
		font-family: 'Lora', sans-serif;
		font-size: 0.9rem;
		color: #0d3b44;
		margin-bottom: 0.75rem;
	}

	.agenda-toolbar {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.agenda-zoom-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.agenda-zoom-button {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		border: 1px solid #43b2dc;
		background: #ffffff;
		color: #0d3b44;
		font-size: 1.1rem;
		line-height: 1;
		cursor: pointer;

		&:disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}

		&:not(:disabled):hover {
			background: #e4d4ff;
		}
	}

	.agenda-zoom-level {
		min-width: 6rem;
		text-align: center;
		font-family: 'Lora', sans-serif;
		font-size: 1rem;
		color: #0d3b44;
	}

	/* En móvil el padding lateral heredado de .page-title/.section (5rem) deja
	   muy poco ancho útil para las columnas de la agenda: se reduce a la mitad
	   solo en esta página. */
	@include mixins.mobile {
		:global(.agenda-hero),
		:global(.agenda-section) {
			padding-left: 2.5rem;
			padding-right: 2.5rem;
		}
	}

	:global(.agenda-table .columns) {
		left: $gutter-width;
		width: calc(100% - #{$gutter-width});
	}

	/* En móvil no queremos que las columnas de sala se compriman hasta ser
	   ilegibles: cada una conserva un ancho cómodo de lectura y, si no caben
	   todas, el usuario las recorre con el scroll horizontal/vertical que ya
	   ofrece .agenda-table (overflow: scroll), igual que en escritorio. */
	@include mixins.mobile {
		:global(.agenda-table .column) {
			flex: none;
			width: 70vw;
			max-width: 18rem;
		}
	}

	/* position: sticky (solo en el eje horizontal, con left: 0) para que la guía no
	   se desplace con el scroll horizontal de las columnas/salas, pero sí siga el
	   scroll vertical con normalidad. height: 0: no roba espacio en el flujo normal
	   (los <span> de las horas son position:absolute dentro y escapan gracias a
	   overflow: visible). */
	.time-gutter {
		position: sticky;
		left: 0;
		width: $gutter-width;
		height: 0;
		overflow: visible;
		z-index: 20;
		pointer-events: none;
	}

	/* Parche visual: como la guía y las tarjetas comparten el mismo scroll
	   horizontal, al desplazarte más allá del primer tramo la guía puede acabar
	   encima de una tarjeta. Cada marca de hora lleva su propia "píldora" con
	   fondo (mismo estilo que los tags de las tarjetas: blanco, redondeado,
	   sombra suave), así solo tapa lo justo detrás del texto, no toda la
	   columna — no es la solución definitiva. */
	.time-gutter__mark {
		position: absolute;
		right: 0.5rem;
		transform: translateY(-50%);
		padding: 0.2rem 0.65rem;
		border-radius: 999px;
		background: #43b2dc;
		border: 1px solid rgba(13, 59, 68, 0.12);
		box-shadow: 0 2px 6px rgba(13, 59, 68, 0.15);
		font-family: 'Lora', sans-serif;
		font-size: 0.9rem;
		font-weight: 600;
		color: #ffffff;
		white-space: nowrap;
	}

	/* La estrella "✦" la pone .content ul li::before (regla global) posicionada en
	   absoluto pegada al borde izquierdo, lo que deja huecos distintos a cada lado
	   del texto. Aquí la desactivamos y la reponemos como parte del grupo
	   estrella+texto dentro del propio botón, centrado como una unidad, para que
	   el hueco a izquierda y derecha del texto sea el mismo. */
	:global(.agenda-section .tabs.is-toggle li::before) {
		content: none;
	}

	:global(.agenda-section .tabs.is-toggle li) {
		padding-left: 0;
	}

	:global(.agenda-section .tabs.is-toggle a) {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
	}

	:global(.agenda-section .tabs.is-toggle a::before) {
		content: '✦';
		color: #b06b2d;
		font-size: 0.85rem;
		line-height: 1;
	}

	:global(.agenda-section .tabs.is-toggle li.is-active a::before) {
		color: #e8b290;
	}

	/* Las celdas de día no seleccionadas deben verse como una pestaña "en blanco"
	   (igual que en el resto del sitio), no dejar transparentar el patrón de olas
	   del fondo de la página. */
	:global(.agenda-section .tabs.is-toggle li:not(.is-active) a) {
		background-color: #ffffff;
	}

	.activity-wrapper {
		position: relative;
	}

	// Antes se calculaba como `container.$container-max-width - container.$container-offset`
	// importando 'bulma/sass/layout/container', pero ese import reemitía (duplicadas y sin
	// usar) todas las variantes .container.* de Bulma dentro de este componente. Con los
	// valores por defecto del proyecto (sin overrides de $gap/$fullhd), esa resta da
	// siempre 1344px, así que se deja el valor final ya calculado.
	$column-extender-width: 1344px;

	.column-extender {
		position: absolute;
		top: 0;
		left: 0;
		width: $column-extender-width;
	}

	.arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		color: #0d3b44;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	.arrow :global(svg) {
		width: 1.4em;
		height: 1.4em;
	}

	.arrow-left {
		left: 5px;
	}

	.arrow-right {
		right: 5px;
	}

	.arrow.visible {
		opacity: 0.8; /* Mantener visibles si es necesario */
	}

	/* Botón "Agenda en PDF": vive en su propia sección, fuera de .agenda-table,
	   por lo que estas reglas no tocan nada del scroll ni del reparto de
	   columnas de la agenda. */
	.agenda-pdf-section {
		padding-top: 0;
	}

	.agenda-pdf-button {
		gap: 0.6rem;
		font-family: 'Cinzel', sans-serif;
	}

	.agenda-pdf-button .icon :global(svg) {
		width: 1.2em;
		height: 1.2em;
	}
</style>
