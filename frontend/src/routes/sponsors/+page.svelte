<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import proposalImage from '../../assets/images/propuesta-actividades.jpg';

	export let data: {
		title?: string;
		content?: string;
	};

	const estelTiendaFormUrl = 'https://forms.gle/u8MMcAH5nMNiFKbV9';
</script>

<section class="hero page-title">
	<h3 class="title">{data.title}</h3>
</section>

<section class="section proposal-page">
	<div class="container">
		<div class="content content-border proposal-card">
			<figure class="proposal-visual">
				<img src={proposalImage} alt={data.title} />
				<figcaption class="proposal-visual__credit">© John Howe - Gandalf The Grey</figcaption>
			</figure>

			{#if data.content}
				<SvelteMarkdown options={{ mangle: false }} source={data.content} />
			{/if}

			<div class="proposal-actions">
				<a class="button is-primary" href={estelTiendaFormUrl} target="_blank" rel="noreferrer">
					¡APUNTA TU PUESTO AQUÍ!
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.proposal-page {
		padding-top: 2rem;
		padding-bottom: 4rem;
	}

	.proposal-card {
		position: relative;
		overflow: hidden;
	}

	.proposal-visual {
		position: relative;
		width: min(100%, 46rem);
		margin: 0 auto 2rem;
		overflow: hidden;
		border-radius: 1.15rem;
		background: var(--bulma-dark, #123f46);
		box-shadow: 0 0.85rem 1.7rem rgba(18, 63, 70, 0.14);
		aspect-ratio: 16 / 7;
	}

	.proposal-visual::after {
		content: '';
		position: absolute;
		inset: 0;
		background:
			linear-gradient(90deg, rgba(18, 63, 70, 0.06), transparent 42%),
			linear-gradient(180deg, transparent 45%, rgba(18, 63, 70, 0.48));
		pointer-events: none;
	}

	.proposal-visual img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.proposal-visual__credit {
		position: absolute;
		right: 1rem;
		bottom: 1rem;
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

	.proposal-actions {
		display: flex;
		justify-content: center;
		margin-top: 2.5rem;
	}

	@media (max-width: 768px) {
		.proposal-visual {
			width: 100%;
			aspect-ratio: 4 / 3;
			border-radius: 1rem;
		}

		.proposal-visual img {
			object-position: 62% center;
		}

		.proposal-visual__credit {
			right: 0.55rem;
			bottom: 0.55rem;
			padding: 0.24rem 0.48rem;
			font-size: 0.66rem;
		}
	}
</style>
