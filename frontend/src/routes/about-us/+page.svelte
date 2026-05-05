<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import aboutUs1 from '../../assets/images/about_us_1.jpg';
	import aboutUs2 from '../../assets/images/about_us_2.jpg';

	let { data } = $props();

	function splitMarkdownContent(content?: string): [string, string] {
		if (!content) return ['', ''];

		const blocks = content
			.trim()
			.split(/\n\s*\n/)
			.filter(Boolean);

		if (blocks.length <= 1) return [content, ''];

		const midpoint = Math.ceil(blocks.length / 2);

		return [blocks.slice(0, midpoint).join('\n\n'), blocks.slice(midpoint).join('\n\n')];
	}

	let contentParts = $derived(splitMarkdownContent(data.content));
</script>

<section class="hero page-title">
	<h3 class="title">{data.title}</h3>
</section>

<section class="section about-event">
	<div class="container">
		<div class="content content-border about-event__content">
			<div class="columns is-vcentered about-event__row">
				<div class="column is-three-fifths">
					{#if contentParts[0]}
						<SvelteMarkdown options={{ mangle: false }} source={contentParts[0]} />
					{/if}
				</div>

				<div class="column about-event__image-column about-event__image-column--right">
					<figure class="about-event__figure">
						<img class="about-event__image" src={aboutUs1} alt="Sobre el evento" />

						<figcaption class="about-event__image-credit">
							© Ted Nasmith - Farewell at the Grey Havens
						</figcaption>
					</figure>
				</div>
			</div>

			{#if contentParts[1]}
				<div class="columns is-vcentered about-event__row about-event__row--second">
					<div class="column about-event__image-column about-event__image-column--left">
						<figure class="about-event__figure">
							<img class="about-event__image" src={aboutUs2} alt="Sobre el evento" />

							<figcaption class="about-event__image-credit">
								© Ted Nasmith - The Shores of Valinor
							</figcaption>
						</figure>
					</div>

					<div class="column is-three-fifths about-event__text-column--right">
						<SvelteMarkdown options={{ mangle: false }} source={contentParts[1]} />
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	/* ==========================================================================
	   Layout general
	   ========================================================================== */

	.about-event__content {
		overflow: hidden;
	}

	.about-event__row {
		gap: 2rem;
		align-items: center;
	}

	.about-event__row--second {
		margin-top: 3rem;
		padding-top: 3rem;
	}

	.about-event__image-column {
		display: flex;
		align-self: stretch;
	}

	.about-event__image-column--right {
		justify-content: flex-end;
	}

	.about-event__image-column--left {
		justify-content: flex-start;
	}

	.about-event__text-column--right {
		margin-left: auto;
	}

	/* ==========================================================================
	   Imagen y copyright
	   ========================================================================== */

	.about-event__figure {
		position: relative;
		width: min(100%, 26rem);
		height: 100%;
		min-height: 26rem;
		margin: 0;
	}

	.about-event__image {
		display: block;
		width: 100%;
		height: 100%;
		min-height: 26rem;
		border-radius: 1.25rem;
		object-fit: cover;
		object-position: center center;
		box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.08);
	}

	.about-event__image-credit {
		position: absolute;
		right: 0.75rem;
		bottom: 0.75rem;
		z-index: 2;
		display: inline-flex;
		align-items: center;
		max-width: calc(100% - 1.5rem);
		margin: 0;
		padding: 0.28rem 0.55rem;
		border: 1px solid rgba(255, 255, 255, 0.22);
		border-radius: 999px;
		background: rgba(8, 33, 38, 0.52);
		color: rgba(255, 255, 255, 0.96);
		font-family: var(--bulma-family-secondary, inherit);
		font-size: 0.72rem;
		line-height: 1;
		letter-spacing: 0.02em;
		text-align: right;
		white-space: nowrap;
		box-shadow: 0 0.35rem 0.9rem rgba(0, 0, 0, 0.18);
		backdrop-filter: blur(4px);
		pointer-events: none;
	}

	/* ==========================================================================
	   Tablet
	   ========================================================================== */

	@media (max-width: 1023px) {
		.about-event__row {
			display: flex;
			flex-direction: column;
			gap: 1.25rem;
		}

		.about-event__row--second {
			flex-direction: column-reverse;
			margin-top: 1.5rem;
			padding-top: 1.5rem;
		}

		.about-event__image-column,
		.about-event__image-column--right,
		.about-event__image-column--left {
			justify-content: center;
			width: 100%;
		}

		.about-event__text-column--right {
			margin-left: 0;
		}

		.about-event__figure {
			width: min(100%, 32rem);
			height: auto;
			min-height: auto;
		}

		.about-event__image {
			aspect-ratio: 16 / 9;
			height: auto;
			min-height: 0;
			object-fit: cover;
			object-position: center center;
		}
	}

	/* ==========================================================================
	   Móvil
	   ========================================================================== */

	@media (max-width: 768px) {
		.about-event__row {
			gap: 0.75rem;
		}

		.about-event__row--second {
			margin-top: 0.75rem;
			padding-top: 0.75rem;
		}

		.about-event__figure {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: min(100%, 22rem);
			height: auto;
			min-height: auto;
			margin: 0;
		}

		.about-event__image {
			aspect-ratio: 4 / 3;
			height: auto;
			min-height: 0;
			object-fit: cover;
			object-position: center center;
			box-shadow: 0 0.45rem 1rem rgba(0, 0, 0, 0.05);
		}

		.about-event__image-credit {
			position: static;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: fit-content;
			max-width: 100%;
			margin: 0.45rem auto 0;
			padding: 0.24rem 0.48rem;
			border: 1px solid rgba(255, 255, 255, 0.22);
			border-radius: 999px;
			background: rgba(8, 33, 38, 0.52);
			color: rgba(255, 255, 255, 0.96);
			font-family: var(--bulma-family-secondary, inherit);
			font-size: 0.66rem;
			line-height: 1.1;
			letter-spacing: 0.02em;
			text-align: center;
			white-space: normal;
			box-shadow: none;
			backdrop-filter: blur(4px);
			pointer-events: none;
		}
	}
</style>
