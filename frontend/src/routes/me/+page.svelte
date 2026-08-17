<script lang="ts">
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages.js';
	import { modals } from 'svelte-modals';
	import ActivityModal from '$lib/ActivityModal.svelte';
	import camisetaIcon from '../../assets/images/me_camiseta.png';
	import cancioneroIcon from '../../assets/images/me_cancionero.png';

	interface Props {
		data: import('./$types').PageData;
		form?: import('./$types').ActionData;
	}

	let { data, form }: Props = $props();

	const activeTab = data.activeTab;
	const tabs = [
		{ name: 'Datos', id: 'datos' },
		{ name: 'Actividades', id: 'actividades' }
	];

	const dash = (value: unknown) =>
		value === null || value === undefined || value === '' ? '—' : value;
	const capitalize = (value: unknown) =>
		typeof value === 'string' && value.length > 0
			? value.charAt(0).toUpperCase() + value.slice(1)
			: dash(value);
	// Algunos campos son booleanos reales en Strapi y otros son texto libre "Sí"/"No":
	// distinguimos por tipo para no convertir el texto "No" en "Sí" (string no vacío = truthy).
	const yesNo = (value: unknown) =>
		typeof value === 'boolean' ? (value ? 'Sí' : 'No') : capitalize(value);

	const galaMenuOptions = [
		{
			label: 'Carne',
			description:
				'Solomillo de cerdo cocinado a baja temperatura sobre terrina de patata y padrón con flor de sal',
			forAdults: true
		},
		{
			label: 'Pescado',
			description:
				'Lomo de lubina con bouquet de cuscús al aroma del caldero regado con salsa D.O Cava',
			forAdults: true
		},
		{ label: 'Vegano', description: '', forAdults: true },
		{
			label: 'Infantil',
			description: 'Plato combinado de pechuga de pollo con patatas fritas, croquetas y nuggets',
			forAdults: false
		},
		{ label: 'Infantil Vegano', description: '', forAdults: false }
	];

	const isAdult = data.user?.age === 'Adulto';
	const visibleGalaMenuOptions = galaMenuOptions.filter((option) => option.forAdults === isAdult);
	const isMinorAge = data.user?.age === 'Menor';

	const NOT_STE_MEMBER = 'No pertenezco a la STE';
	const STE_MEMBERSHIP_URL = 'https://www.sociedadtolkien.org/hazte-socio/';

	// Un logo por smial, con el nombre exacto del smial como nombre de archivo
	// (incluye tildes/ñ). Si no hay coincidencia para el valor de Strapi, no se muestra nada.
	const smialImageModules = import.meta.glob(
		'/src/assets/images/smials/*.{jpg,jpeg,png,svg,webp}',
		{
			eager: true,
			import: 'default'
		}
	) as Record<string, string>;

	const smialImages: Record<string, string> = {};
	for (const [path, url] of Object.entries(smialImageModules)) {
		const filename = path.split('/').pop() ?? '';
		const name = filename.replace(/\.[^.]+$/, '').trim();
		smialImages[name] = url;
	}

	// .trim() por si el valor guardado en Strapi trae espacios de más al principio/final.
	const rawSmial = typeof data.user?.smial === 'string' ? data.user.smial.trim() : undefined;
	const smialImageUrl = rawSmial ? smialImages[rawSmial] : undefined;
	// Comparación sin distinguir mayúsculas/minúsculas: es un valor especial "centinela",
	// no un nombre propio de smial, así que toleramos variaciones de capitalización.
	const isNotSteMember = rawSmial?.toLowerCase() === NOT_STE_MEMBER.toLowerCase();

	// Mismo patrón que ActivityCard.svelte: solo abre modal si la actividad tiene página propia.
	function handleActivityClick(activity: any) {
		if (activity.has_own_page) {
			modals.open(ActivityModal, { activity });
		}
	}

	// El valor de los icon-tile (camiseta, cancionero...) puede traer varias
	// partes separadas por "|" (p. ej. varias tallas). En vez de dejar que el
	// navegador decida dónde cortar el texto (queda feo, corta en mitad de
	// una parte), partimos nosotros: una parte por línea.
	function splitTileValue(value: unknown): string[] {
		if (value === null || value === undefined || value === '') return [];
		return String(value)
			.split('|')
			.map((part) => part.trim())
			.filter(Boolean);
	}

	// Tamaño de letra según la parte más larga (no la longitud total), ya que
	// cada parte ocupa su propia línea.
	function tileValueSize(lines: string[], scale = 1) {
		const longest = lines.reduce((max, line) => Math.max(max, line.length), 0);
		let size = 2.5;
		if (longest > 20) size = 1.1;
		else if (longest > 12) size = 1.5;
		else if (longest > 6) size = 2;

		// Con varias partes apiladas (una por línea), hay que bajar el tamaño
		// aunque cada una sea corta, o el conjunto no cabe en el icono.
		if (lines.length >= 3) size = Math.min(size, 1.3);
		else if (lines.length === 2) size = Math.min(size, 1.8);

		return `${size * scale}rem`;
	}

	const shirtLines = $derived(splitTileValue(data.user?.shirt));
	const songBookLines = $derived(splitTileValue(data.user?.song_book));
</script>

{#if data.user}
	{#if data.settings?.show_activity_registration && (data.activities.length > 0 || data.user.activities_registered.length > 0 || data.user.activities_queued.length > 0)}
		<div class="tabs is-centered is-medium mb-0">
			<ul>
				{#each tabs as tab}
					<li class={activeTab === tab.id ? 'is-active' : ''}>
						<a data-sveltekit-reload href="?tab={tab.id}">{tab.name}</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
{/if}

<div class="tab-content">
	{#if activeTab === 'datos'}
		<section class="hero page-title">
			<div class="is-flex is-align-items-center">
				<h3 class="title mb-0 mr-4">Datos de inscripción</h3>
				<span class="is-flex-grow-1"></span>
				<a href="/logout" data-sveltekit-reload class="button is-primary is-uppercase">
					<span class="icon-text">
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
								<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
								<polyline points="16 17 21 12 16 7" />
								<line x1="21" y1="12" x2="9" y2="12" />
							</svg>
						</span>
						<span>{m.logout()}</span>
					</span>
				</a>
			</div>
			<p class="me-edit-notice">
				Los datos de esta ficha no se pueden editar desde la web. Para solicitar cualquier cambio,
				escríbenos a
				<a href="mailto:estelcon@sociedadtolkien.org">estelcon@sociedadtolkien.org</a>.
			</p>
		</section>

		<section class="section">
			<div class="container">
				<div class="content content-border">
					{#if data.user}
						<div class="columns me-cards">
							<div class="column">
								<div class="card me-card">
									<div class="card-content">
										<h3>Datos personales</h3>
										{#if smialImageUrl}
											<div class="smial-block">
												<div class="smial-badge">
													{#if isNotSteMember}
														<a href={STE_MEMBERSHIP_URL} target="_blank" rel="noopener noreferrer">
															<img src={smialImageUrl} alt={data.user.smial} />
														</a>
													{:else}
														<img src={smialImageUrl} alt={data.user.smial} />
													{/if}
												</div>
												<div class="field">
													<label class="label">Smial</label>
													<p class="is-size-5">{dash(data.user.smial)}</p>
												</div>
											</div>
										{:else}
											<div class="field">
												<label class="label">Smial</label>
												<p class="is-size-5">{dash(data.user.smial)}</p>
											</div>
										{/if}
										<div class="columns">
											<div class="column">
												<div class="field">
													<label class="label">Usuario</label>
													<p class="is-size-5">{dash(data.user.username)}</p>
												</div>
											</div>
											<div class="column">
												<div class="field">
													<label class="label">Email</label>
													<p class="is-size-5">{dash(data.user.email)}</p>
												</div>
											</div>
										</div>
										<div class="field">
											<label class="label">Nombre y apellidos</label>
											<p class="is-size-5">{dash(data.user.name)} {dash(data.user.surname)}</p>
										</div>
										<div class="columns">
											<div class="column">
												<div class="field">
													<label class="label">Teléfono</label>
													<p class="is-size-5">{dash(data.user.phone_number)}</p>
												</div>
											</div>
											<div class="column">
												<div class="field">
													<label class="label">Epessë</label>
													<p class="is-size-5">{dash(data.user.pseudonym)}</p>
												</div>
											</div>
										</div>
										<div class="columns">
											<div class="column">
												<div class="field">
													<label class="label">Edad</label>
													<p class="is-size-5">{dash(data.user.age)}</p>
												</div>
											</div>
											{#if !isMinorAge}
												<div class="column">
													<div class="field">
														<label class="label">¿Acompañado de un menor de 12 años?</label>
														<p class="is-size-5">{yesNo(data.user.minor)}</p>
													</div>
												</div>
												<div class="column">
													<div class="field">
														<label class="label">Peticiones para bebés</label>
														<p class="is-size-5">{dash(data.user.minor_adds)}</p>
													</div>
												</div>
											{/if}
										</div>
									</div>
								</div>

								<div class="card me-card">
									<div class="card-content">
										<h3>Alojamiento</h3>
										<div class="columns">
											<div class="column">
												<div class="field">
													<label class="label">Tipo de inscripción</label>
													<p class="is-size-5">{capitalize(data.user.registration)}</p>
												</div>
											</div>
											<div class="column">
												<div class="field">
													<label class="label">Tipo de habitación</label>
													<p class="is-size-5">{dash(data.user.room_type)}</p>
												</div>
											</div>
											<div class="column">
												<div class="field">
													<label class="label">Código Habitación</label>
													<p class="is-size-5">{dash(data.user.room_code)}</p>
												</div>
											</div>
										</div>
										{#if data.user.registration?.toLowerCase() === 'aleatoria'}
											<div class="field">
												<label class="label">Preferencias para habitación aleatoria</label>
												<p class="is-size-5">{dash(data.user.cond_random)}</p>
											</div>
										{/if}
										<div class="columns">
											<div class="column">
												<div class="field">
													<label class="label">Todo incluido</label>
													<p class="is-size-5">{yesNo(data.user.all_inclusive)}</p>
												</div>
											</div>
											<div class="column">
												<div class="field">
													<label class="label">Llegada tardía</label>
													<p class="is-size-5">{yesNo(data.user.late_arrival)}</p>
												</div>
											</div>
											<div class="column">
												<div class="field">
													<label class="label">Salida anticipada</label>
													<p class="is-size-5">{yesNo(data.user.pre_exit)}</p>
												</div>
											</div>
										</div>
										<div class="columns">
											<div class="column">
												<div class="field">
													<label class="label">Mentor</label>
													<p class="is-size-5">{yesNo(data.user.mentor)}</p>
												</div>
											</div>
											<div class="column">
												<div class="field">
													<label class="label">Primera EstelCon</label>
													<p class="is-size-5">{yesNo(data.user.mentee)}</p>
												</div>
											</div>
											<div class="column">
												<div class="field">
													<label class="label">Grumete</label>
													<p class="is-size-5">{yesNo(data.user.aide)}</p>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="card me-card">
									<div class="card-content">
										<h3>Tus actividades</h3>
										{#if data.user.activities_registered.length === 0 && data.user.activities_queued.length === 0}
											<p class="is-size-5">No te has apuntado a ninguna actividad.</p>
										{:else}
											{#if data.user.activities_registered.length > 0}
												<label class="label">Inscrito/a en</label>
												<ul class="list ml-0">
													{#each data.user.activities_registered as activity}
														<li
	class="list-item {activity.has_own_page ? 'clickable-activity' : ''}"
	onclick={() => handleActivityClick(activity)}
	role={activity.has_own_page ? 'button' : undefined}
	tabindex={activity.has_own_page ? 0 : undefined}
>
	{activity.title}
</li>
													{/each}
												</ul>
											{/if}
											{#if data.user.activities_queued.length > 0}
												<label class="label">En cola de espera en</label>
												<ul class="list ml-0">
													{#each data.user.activities_queued as activity}
														<li
	class="list-item {activity.has_own_page ? 'clickable-activity' : ''}"
	onclick={() => handleActivityClick(activity)}
	role={activity.has_own_page ? 'button' : undefined}
	tabindex={activity.has_own_page ? 0 : undefined}
>
	{activity.title}
</li>
													{/each}
												</ul>
											{/if}
										{/if}
									</div>
								</div>
							</div>

							<div class="column">
								<div class="card me-card">
									<div class="card-content">
										<h3>Alimentación</h3>
										<p class="gala-menu-options">
											{#each visibleGalaMenuOptions as option, index}
												<b>{option.label}{option.description ? ':' : ''}</b>
												{option.description}
												{#if index < visibleGalaMenuOptions.length - 1}<br />{/if}
											{/each}
										</p>
										<div class="columns">
											<div class="column">
												<div class="field">
													<label class="label">Menú cena de gala</label>
													<p class="is-size-5">{dash(data.user.gala_dinner)}</p>
												</div>
											</div>
											<div class="column">
												<div class="field">
													<label class="label">Menú especial</label>
													<p class="is-size-5">{dash(data.user.menu)}</p>
												</div>
											</div>
										</div>
										<div class="field">
											<label class="label">Intolerancias / Alergias</label>
											<p class="is-size-5">{dash(data.user.allergy)}</p>
										</div>
									</div>
								</div>

								<div class="card me-card">
									<div class="card-content">
										<h3>Extras</h3>
										<div class="columns me-icon-row">
											<div class="column">
												<div class="me-icon-tile">
													<span class="me-icon-tile__label">Camiseta</span>
													<div
														class="me-icon-tile__icon"
														style="-webkit-mask-image: url({camisetaIcon}); mask-image: url({camisetaIcon})"
													>
														<span
															class="me-icon-tile__value"
															style="font-size: {tileValueSize(
															shirtLines,
															shirtLines.length <= 1 ? 0.9 : 1
														)}"
														>
															{#if shirtLines.length > 0}
																{#each shirtLines as line, i}
																	{line}{#if i < shirtLines.length - 1}<br />{/if}
																{/each}
															{:else}
																—
															{/if}
														</span>
													</div>
												</div>
											</div>
											<div class="column">
												<div class="me-icon-tile">
													<span class="me-icon-tile__label">Cancionero</span>
													<div
														class="me-icon-tile__icon"
														style="-webkit-mask-image: url({cancioneroIcon}); mask-image: url({cancioneroIcon})"
													>
														<span
															class="me-icon-tile__value"
															style="font-size: {tileValueSize(songBookLines, 0.9)}"
														>
															{#if songBookLines.length > 0}
																{#each songBookLines as line, i}
																	{line}{#if i < songBookLines.length - 1}<br />{/if}
																{/each}
															{:else}
																—
															{/if}
														</span>
													</div>
												</div>
											</div>
										</div>
										<div class="columns">
											<div class="column">
												<div class="field">
													<label class="label">Suplemento</label>
													<p class="is-size-5">{dash(data.user.supplement)}</p>
												</div>
											</div>
											<div class="column">
												<div class="field">
													<label class="label">Precio total</label>
													<p class="is-size-5">{dash(data.user.price)}</p>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="card me-card">
									<div class="card-content">
										<h3>Actividades propuestas</h3>
										{#if data.user.activities_staff?.length > 0}
											<ul class="list ml-0">
												{#each data.user.activities_staff as activity}
													<li
	class="list-item {activity.has_own_page ? 'clickable-activity' : ''}"
	onclick={() => handleActivityClick(activity)}
	role={activity.has_own_page ? 'button' : undefined}
	tabindex={activity.has_own_page ? 0 : undefined}
>
	{activity.title}
</li>
												{/each}
											</ul>
										{:else}
											<p class="is-size-5">No se ha propuesto ninguna actividad.</p>
										{/if}
									</div>
								</div>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</section>
	{:else if activeTab === 'actividades'}
		<section class="hero page-title">
			<div class="is-flex is-align-items-center">
				<h3 class="title mb-0 mr-4">Actividades</h3>
			</div>
		</section>
		<section class="section">
			<div class="container">
				<div class="content content-border">
					{#if form?.success === true}
						<p class="notification is-info">{form?.message}</p>
					{/if}
					{#if form?.success === false}
						<p class="notification is-danger">{form?.message}</p>
					{/if}
					{#if data.user}
						{#if data.settings?.show_activity_registration && (data.activities.length > 0 || data.user.activities_registered.length > 0 || data.user.activities_queued.length > 0)}
							<form method="POST">
								<div class="columns is-tablet">
									<div class="column">
										<div class="card me-card">
											<div class="card-content">
												<h3>Actividades con inscripción</h3>
												<p>
													Recuerda que las actividades son limitadas y que debes inscribirte a las
													que quieras asistir.
												</p>
												<ul class="list ml-0">
													{#each data.activities as activity}
														<li class="list-item">
															{activity.title}
															<button
																class="button is-primary ml-auto"
																formaction="?/signIn&activityId={activity.documentId}&tab={activeTab}"
															>
																Inscribir
															</button>
														</li>
													{/each}
													{#if data.activities.length === 0}
														<li class="list-item">No queda ninguna actividad con inscripción.</li>
													{/if}
												</ul>
											</div>
										</div>
									</div>
									<div class="column">
										<div class="card me-card">
											<div class="card-content">
												<h3>Actividades a las que te has inscrito</h3>
												<ul class="list">
													{#each data.user.activities_registered as activity}
														<li class="list-item">
															{activity.title}
															<button
																class="button is-danger ml-auto"
																formaction="?/signOut&activityId={activity.documentId}&tab={activeTab}"
															>
																Cancelar
															</button>
														</li>
													{/each}
													{#if data.user.activities_registered.length === 0}
														<li class="list-item">No estás inscrito en ninguna actividad.</li>
													{/if}
												</ul>
												{#if data.user.activities_queued.length > 0}
													<h4>Actividades en las que estás en cola</h4>
													<ul class="list">
														{#each data.user.activities_queued as activity}
															<li class="list-item">
																{activity.title}
																<button
																	class="button is-danger ml-auto"
																	formaction="?/signOutQueued&activityId={activity.documentId}&tab={activeTab}"
																>
																	Cancelar
																</button>
															</li>
														{/each}
													</ul>
												{/if}
											</div>
										</div>
									</div>
								</div>
							</form>
						{/if}
					{/if}
				</div>
			</div>
		</section>
	{/if}
</div>

<style>
	/* .content trae de serie text-align:justify (regla global pensada para las
	   páginas de contenido tipo Markdown); en toda la ficha de /me lo queremos
	   siempre a la izquierda. */
	.content :global(p),
	.content :global(li),
	.content :global(h3),
	.content :global(h4) {
		text-align: left;
	}

	.me-edit-notice {
		margin-top: 0.75rem;
		padding: 0.85rem 1.1rem;
		border-left: 3px solid #b06b2d;
		border-radius: 0.5rem;
		background: rgba(176, 107, 45, 0.08);
		color: #6b4420;
		font-family: 'Lora', sans-serif;
		font-size: 0.95rem;
		font-style: italic;
	}

	.me-edit-notice a {
		color: #0d3b44;
		font-weight: 700;
	}

	.me-card {
		border-radius: 1.25rem;
		box-shadow: 0 12px 30px rgba(13, 59, 68, 0.1);
	}

	.me-card .label {
		color: #23434a;
	}

	/* La estrella "✦" ya la añade .content ul li::before (regla global); aquí solo
	   la centramos verticalmente respecto al texto (en vez del "top" fijo por defecto)
	   y le damos algo más de aire respecto al texto. */
	:global(.content .list .list-item) {
		padding-left: 1.7rem;
		gap: 1rem;
	}

	:global(.content .list .list-item::before) {
		top: 50%;
		transform: translateY(-50%);
	}

	.icon-text .icon svg {
		width: 1.1rem;
		height: 1.1rem;
	}

	.gala-menu-options {
		font-style: italic;
		color: #767676;
		font-size: 0.88em;
	}

	.smial-block {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin: 0.25rem 0 1.25rem;
	}

	.smial-badge {
		flex-shrink: 0;
	}

	.smial-badge img {
		display: block;
		max-width: 140px;
		max-height: 140px;
		border-radius: 0.75rem;
		box-shadow: 0 8px 20px rgba(13, 59, 68, 0.15);
		transition: transform 0.2s ease;
	}

	.smial-badge a img:hover {
		transform: translateY(-2px) scale(1.02);
	}

	.me-icon-row {
		row-gap: 0;
	}

	.me-icon-tile {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		text-align: center;
	}

	.me-icon-tile__label {
		color: #0d3b44;
		font-size: 0.85rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.me-icon-tile__icon {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		min-height: 9rem;
		/* Los PNG son una silueta con transparencia: en vez de usarlos tal cual
		   (con su propio color fijo), los usamos como máscara y rellenamos con
		   el azul de la marca — así cambiar el color es cosa de una variable. */
		background-color: #0d3b44;
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-position: center;
		mask-position: center;
		-webkit-mask-size: 60%;
		mask-size: 60%;
	}

	.me-icon-tile__value {
		max-width: 80%;
		color: #ffffff;
		font-weight: 700;
		line-height: 1.15;
		text-align: center;
		overflow-wrap: break-word;
		word-break: break-word;
		text-shadow: 0 2px 6px rgba(0, 0, 0, 0.45);
	}

	:global(.clickable-activity) {
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	:global(.clickable-activity:hover) {
		background-color: rgba(13, 59, 68, 0.05);
	}
</style>
