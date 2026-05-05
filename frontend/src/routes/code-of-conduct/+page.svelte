<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import charterPartieImage from '../../assets/images/charte_partie.jpg';

	let { data } = $props();

	function splitIntroContent(content?: string): [string, string, string] {
		if (!content) return ['', '', ''];

		const blocks = content
			.trim()
			.split(/\n\s*\n/)
			.filter(Boolean);

		const cardTitle = blocks[0] ?? '';
		const cardText = blocks[1] ?? '';
		const bodyContent = blocks.slice(2).join('\n\n');

		return [cardTitle, cardText, bodyContent];
	}

	let contentParts = $derived(splitIntroContent(data.content));
</script>

<section class="hero page-title">
	<h3 class="title">{data.title}</h3>
</section>

<section class="section charter-page">
	<div class="container">
		{#if contentParts[0] || contentParts[1]}
			<div class="charter-card">
				<div class="charter-card__image">
					<img src={charterPartieImage} alt="" />
					<span class="charter-card__credit">© Zoltan Boros</span>
				</div>

				<div class="charter-card__content">
					{#if contentParts[0]}
						<div class="charter-card__title">
							<SvelteMarkdown options={{ mangle: false }} source={contentParts[0]} />
						</div>
					{/if}

					{#if contentParts[1]}
						<div class="strapi-markdown charter-card__text">
							<SvelteMarkdown options={{ mangle: false }} source={contentParts[1]} />
						</div>
					{/if}
				</div>
			</div>
		{/if}

		{#if contentParts[2]}
			<div class="content content-border charter-body">
				<SvelteMarkdown options={{ mangle: false }} source={contentParts[2]} />
			</div>
		{/if}
	</div>
</section>

<style>
	/* ==========================================================================
	   Layout general
	   ========================================================================== */

	.charter-page {
		padding-top: 2rem;
		padding-bottom: 4rem;
		overflow-x: hidden;
	}

	.charter-body {
		margin-top: 2.5rem;
	}

	/* ==========================================================================
	   Tarjeta superior
	   ========================================================================== */

	.charter-card {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 0.45fr) minmax(0, 1.55fr);
		gap: 1.5rem;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		max-width: 100%;
		margin: 0 0 2.5rem;
		padding: 1.1rem;
		overflow: visible;
		border: 1px solid rgba(18, 63, 70, 0.1);
		border-radius: 1.5rem;
		background:
			radial-gradient(circle at 12% 18%, rgba(215, 181, 109, 0.16), transparent 16rem),
			rgba(255, 255, 255, 0.76);
		box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.05);
		backdrop-filter: blur(8px);
	}

	.charter-card::before {
		content: '';
		position: absolute;
		top: 0;
		right: 1.5rem;
		left: 1.5rem;
		height: 2px;
		background: linear-gradient(90deg, transparent, #d7b56d, transparent);
		opacity: 0.9;
		pointer-events: none;
	}

	.charter-card::after {
		content: '✦';
		position: absolute;
		top: 0;
		left: 50%;
		padding: 0 0.65rem;
		background: rgba(255, 255, 255, 0.86);
		color: #d7b56d;
		font-size: 1.15rem;
		line-height: 1;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	/* ==========================================================================
	   Imagen y copyright
	   ========================================================================== */

	.charter-card__image {
		position: relative;
		height: 11rem;
		overflow: hidden;
		border-radius: 1.15rem;
		background: var(--bulma-dark, #123f46);
	}

	.charter-card__image::after {
		content: '';
		position: absolute;
		inset: 0;
		background:
			linear-gradient(90deg, rgba(18, 63, 70, 0.2), transparent 45%),
			linear-gradient(180deg, transparent 40%, rgba(18, 63, 70, 0.35));
		pointer-events: none;
	}

	.charter-card__image img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.charter-card__credit {
		position: absolute;
		right: 0.75rem;
		bottom: 0.75rem;
		z-index: 2;
		display: inline-flex;
		align-items: center;
		padding: 0.28rem 0.55rem;
		border: 1px solid rgba(255, 255, 255, 0.22);
		border-radius: 999px;
		background: rgba(8, 33, 38, 0.52);
		color: rgba(255, 255, 255, 0.96);
		font-size: 0.72rem;
		line-height: 1;
		letter-spacing: 0.02em;
		white-space: nowrap;
		box-shadow: 0 0.35rem 0.9rem rgba(0, 0, 0, 0.18);
		backdrop-filter: blur(4px);
		pointer-events: none;
	}

	/* ==========================================================================
	   Texto de la tarjeta
	   ========================================================================== */

	.charter-card__content {
		width: 90%;
		max-width: 100%;
	}

	.charter-card__title {
		margin: 0 0 0.55rem;
		color: var(--bulma-dark, #123f46);
		font-family: var(--bulma-family-primary, inherit);
		font-size: 1.65rem;
		line-height: 1.15;
		text-align: left;
	}

	.charter-card__title :global(p),
	.charter-card__title :global(h1),
	.charter-card__title :global(h2),
	.charter-card__title :global(h3),
	.charter-card__title :global(h4) {
		margin: 0;
		color: inherit;
		font: inherit;
		line-height: inherit;
		text-align: inherit;
	}

	.charter-card__text {
		margin: 0;
		color: rgba(18, 63, 70, 0.78);
		font-size: inherit;
		line-height: inherit;
		text-align: left;
	}

	.charter-card__text :global(p) {
		margin: 0;
		color: inherit;
		font-size: inherit;
		line-height: inherit;
		text-align: inherit;
	}

	/* ==========================================================================
	   Anulación del justificado global dentro de la tarjeta
	   ========================================================================== */

	.charter-card p,
	.charter-card li {
		text-align: left;
		text-justify: auto;
		hyphens: none;
	}

	/* ==========================================================================
	   Responsive
	   ========================================================================== */

	@media (max-width: 768px) {
		.charter-card {
			grid-template-columns: minmax(0, 1fr);
			gap: 1.25rem;
			width: 100%;
			max-width: 100%;
			padding: 1rem;
		}

		.charter-card__image {
			height: 10rem;
		}

		.charter-card__credit {
			right: 0.55rem;
			bottom: 0.55rem;
			padding: 0.24rem 0.48rem;
			font-size: 0.66rem;
		}

		.charter-card__content {
			width: 100%;
			max-width: 100%;
		}

		.charter-card__title {
			font-size: 1.4rem;
		}
	}
</style>
