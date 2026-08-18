<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';

	let { isOpen, close, activity } = $props();

	function formatStart(start: string | undefined) {
		if (!start) return null;
		const date = new Date(start);
		const dateLabel = date.toLocaleDateString('es-ES', {
			weekday: 'long',
			day: 'numeric',
			month: 'long'
		});
		const timeLabel = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
		return `${dateLabel.charAt(0).toUpperCase()}${dateLabel.slice(1)}, ${timeLabel}`;
	}

	function formatDuration(minutes: number | undefined) {
		if (!minutes) return null;
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		if (hours > 0 && remainingMinutes > 0) return `${hours} h ${remainingMinutes} min`;
		if (hours > 0) return `${hours} h`;
		return `${minutes} min`;
	}

	const startLabel = $derived(formatStart(activity.start));
	const durationLabel = $derived(formatDuration(activity.minutes));
	const attendeesLabel = $derived(
		activity.attendees_limit > 0 ? `Aforo: ${activity.attendees_limit} plazas` : null
	);
	const hasMeta = $derived(
		Boolean(startLabel || durationLabel || activity.track?.title || attendeesLabel)
	);

	/**
	 * tag1 puede venir vacío, ser solo un enlace, ser solo texto normal, o un
	 * híbrido "enlace|texto" (el "|" separa ambas partes). Cada parte se
	 * clasifica por separado: si empieza por "http" es un enlace (se muestra
	 * como "Pulse aquí para más información" hacia esa URL), si no, es texto
	 * normal tal cual.
	 */
	function parseTag1(tag1: string | undefined | null) {
		if (!tag1) return [];
		return tag1
			.split('|')
			.map((part) => part.trim())
			.filter(Boolean)
			.map((part) =>
				part.startsWith('http')
					? { type: 'link' as const, href: part, label: 'Pulse aquí para más información' }
					: { type: 'text' as const, label: part }
			);
	}

	const tag1Items = $derived(parseTag1(activity.tag1));
</script>

{#if isOpen}
	<div role="dialog" class="modal activity-modal">
		<div class="modal-background"></div>

		<div class="modal-card activity-modal__card">
			<header class="modal-card-head activity-modal__head">
				<div>
					<p class="modal-card-title activity-modal__title">{activity.title}</p>

					{#if activity.short_description}
						<p class="activity-modal__subtitle">{activity.short_description}</p>
					{/if}

					{#if hasMeta}
						<ul class="activity-modal__meta">
							{#if startLabel}
								<li>{startLabel}</li>
							{/if}
							{#if durationLabel}
								<li>{durationLabel}</li>
							{/if}
							{#if activity.track?.title}
								<li>{activity.track.title}</li>
							{/if}
							{#if attendeesLabel}
								<li>{attendeesLabel}</li>
							{/if}
						</ul>
					{/if}
				</div>

				<button onclick={close} class="delete activity-modal__close" aria-label="close"></button>
			</header>

			<section class="modal-card-body activity-modal__body">
				{#if activity.needs_registration}
					<p class="activity-modal__registration-notice">
						Esta actividad requiere inscripción previa.
					</p>
				{/if}

				<div class="content activity-modal__content">
					{#if activity.long_description}
						<SvelteMarkdown options={{ mangle: false }} source={activity.long_description} />
					{/if}
				</div>
			</section>

			{#if activity.tag2 || tag1Items.length > 0}
				<footer class="modal-card-foot activity-modal__foot">
					<div class="activity-modal__tags">
						{#if activity.tag2}
							<span class="activity-modal__tag activity-modal__tag--secondary">{activity.tag2}</span
							>
						{/if}
					</div>

					{#if tag1Items.length > 0}
						<div class="activity-modal__tags activity-modal__tags--right">
							{#each tag1Items as item}
								{#if item.type === 'link'}
									<a
										class="activity-modal__tag activity-modal__tag--link"
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
									>
										{item.label}
									</a>
								{:else}
									<span class="activity-modal__tag activity-modal__tag--text">{item.label}</span>
								{/if}
							{/each}
						</div>
					{/if}
				</footer>
			{/if}
		</div>
	</div>
{/if}

<style>
	.activity-modal {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		pointer-events: auto;
	}

	.activity-modal__card {
		position: relative;
		overflow: hidden;
		width: min(92vw, 760px);
		border: 1px solid rgba(13, 59, 68, 0.16);
		border-radius: 0.5rem;
		box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.28);
	}

	.activity-modal__card::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		z-index: 1;
		height: 0.35rem;
		background: linear-gradient(90deg, #0d3b44, #43b2dc, #8d627b);
	}

	.activity-modal__head {
		position: relative;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 2rem 4rem 1.4rem 2rem;
		background:
			linear-gradient(rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.96)),
			radial-gradient(circle at top right, rgba(67, 178, 220, 0.2), transparent 42%);
		border-bottom: 1px solid rgba(13, 59, 68, 0.1);
	}

	.activity-modal__title {
		margin: 0;
		font-size: 1.55rem;
		line-height: 1.25;
		color: #0d3b44;
		flex-grow: initial;
		flex-shrink: initial;
	}

	.activity-modal__title::after {
		content: '';
		display: block;
		width: 4rem;
		height: 2px;
		margin-top: 0.75rem;
		background: #43b2dc;
	}

	.activity-modal__subtitle {
		margin-top: 0.8rem;
		margin-bottom: 0;
		font-family: Lora, serif;
		font-size: 1rem;
		font-style: italic;
		color: #0d3b44;
	}

	.activity-modal__meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 0.9rem;
		margin-top: 0.9rem;
		padding: 0;
		list-style: none;
	}

	.activity-modal__meta li {
		position: relative;
		padding-left: 0;
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: #43708a;
	}

	.activity-modal__meta li:not(:last-child)::after {
		content: '·';
		margin-left: 0.9rem;
		color: rgba(13, 59, 68, 0.3);
	}

	.activity-modal__registration-notice {
		margin: 0 0 1.2rem;
		padding: 0.65rem 0.9rem;
		border-left: 3px solid #b06b2d;
		border-radius: 0.4rem;
		background: rgba(176, 107, 45, 0.08);
		color: #6b4420;
		font-size: 0.9rem;
	}

	.activity-modal__close {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		z-index: 2;
	}

	.activity-modal__body {
		padding: 1.8rem 2rem 2rem;
		background: #ffffff;
	}

	.activity-modal__content {
		color: #0d3b44;
	}

	/* .content trae de serie text-align:justify (regla global pensada para las
	   páginas de contenido tipo Markdown); aquí lo queremos a la izquierda. */
	.activity-modal__content :global(p),
	.activity-modal__content :global(li) {
		text-align: left;
	}

	.activity-modal__content :global(img) {
		display: block;
		width: min(100%, 34rem);
		height: auto;
		margin: 1rem auto;
		border-radius: 0.35rem;
		box-shadow: 0 1rem 2rem rgba(13, 59, 68, 0.16);
	}

	.activity-modal__foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 1.15rem 2rem 1.35rem;
		background: #0d3b44;
		border-top: 0;
	}

	.activity-modal__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.activity-modal__tags--right {
		margin-left: auto;
	}

	.activity-modal__tag {
		display: inline-flex;
		width: fit-content;
		padding: 0.35rem 0.75rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}

	/* Mismo color que usa la tarjeta de la agenda para tag2 (.tag.is-info,
	   sobrescrito a violeta en app.scss) — para que el pie del modal se vea
	   igual que el pill de la tarjeta. tag1 no se usa nunca (puede contener
	   cualquier cosa, como enlaces sueltos, no está pensado para mostrarse). */
	.activity-modal__tag--secondary {
		color: #ffffff;
		background: #8d627b;
	}

	/* tag1: enlace ("Pulse aquí para más información") o texto normal (p.ej.
	   "10.00 €"), a la derecha del pie, en el lado opuesto a tag2. */
	.activity-modal__tag--link {
		color: #0d3b44;
		background: #ffffff;
		text-decoration: none;
		cursor: pointer;
	}

	.activity-modal__tag--link:hover {
		background: #d1f0f9;
	}

	.activity-modal__tag--text {
		color: #ffffff;
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.5);
	}

	@media screen and (max-width: 768px) {
		.activity-modal {
			padding: 0.75rem;
		}

		.activity-modal__head {
			padding: 1.6rem 3.75rem 1.2rem 1.25rem;
		}

		.activity-modal__title {
			font-size: 1.25rem;
		}

		.activity-modal__body {
			padding: 1.4rem 1.25rem 1.6rem;
		}

		.activity-modal__foot {
			padding: 1.15rem 1.25rem 1.35rem;
		}

		.activity-modal__close {
			top: 1.15rem;
			right: 1.15rem;
			display: block !important;
			z-index: 10;
			width: 32px;
			height: 32px;
			min-width: 32px;
			min-height: 32px;
		}

		.activity-modal__content :global(p:has(img)) {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			align-items: center;
			justify-content: center;
		}

		.activity-modal__content :global(p:has(img) img) {
			width: min(100%, 17rem);
			margin: 0;
		}
	}
</style>
