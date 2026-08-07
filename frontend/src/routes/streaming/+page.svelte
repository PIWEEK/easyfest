<script lang="ts">
	import { modals } from 'svelte-modals';
	import ShopStallModal from '$lib/ShopStallModal.svelte';
	import proposalImage from '../../assets/images/propuesta-actividades.jpg';

	type Stall = {
		name: string;
		person?: string;
		description?: string;
		descriptions?: string[];
		preorderContact?: string;
		links?: { label: string; url: string }[];
		images?: { url: string; alternativeText?: string; name?: string }[];
	};

	export let data: {
		title?: string;
		intro?: string;
		introHtml?: string;
		stalls?: Stall[];
	};

	function openStallModal(stall: Stall) {
		modals.open(ShopStallModal as any, { stall });
	}
</script>

<section class="hero page-title">
	<h3 class="title">{data.title}</h3>
</section>

<section class="section proposal-page">
	<div class="container">
		<div class="content-border proposal-card">
			<figure class="proposal-visual">
				<img src={proposalImage} alt={data.title} />
				<figcaption class="proposal-visual__credit">© John Howe - Gandalf The Grey</figcaption>
			</figure>

			{#if data.intro}
				<div class="content proposal-intro">
					{@html data.introHtml}
				</div>
			{/if}

			{#if (data.stalls?.length ?? 0) > 0}
				<div class="shop-stalls">
					{#each data.stalls ?? [] as stall}
						<button class="shop-stall-card" type="button" onclick={() => openStallModal(stall)}>
							<span class="shop-stall-card__title">{stall.name}</span>

							{#if stall.person}
								<span class="shop-stall-card__person">{stall.person}</span>
							{/if}

							{#if stall.description}
								<span class="shop-stall-card__description">{stall.description}</span>
							{/if}

							{#if stall.preorderContact}
								<span class="shop-stall-card__preorder">Acepta encargos previos</span>
							{/if}
						</button>
					{/each}
				</div>
			{/if}
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

	.shop-stalls {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.25rem;
		margin-top: 2.5rem;
	}

	.shop-stall-card {
		position: relative;
		display: block;
		width: 100%;
		padding: 1.35rem 1.45rem;
		overflow: hidden;
		border: 1px solid rgba(13, 59, 68, 0.16);
		background:
			linear-gradient(rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.96)),
			radial-gradient(circle at top right, rgba(141, 98, 123, 0.14), transparent 42%);
		box-shadow: 0 0.75rem 2rem rgba(13, 59, 68, 0.1);
		color: #0d3b44;
		text-align: left;
		cursor: pointer;
		transition:
			transform 0.22s ease,
			box-shadow 0.22s ease,
			border-color 0.22s ease;
	}

	.shop-stall-card::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		z-index: 1;
		height: 0.35rem;
		background: linear-gradient(90deg, #0d3b44, #8d627b, #43b2dc);
	}

	.shop-stall-card:hover {
		transform: translateY(-0.25rem);
		border-color: rgba(141, 98, 123, 0.42);
		box-shadow: 0 1.1rem 2.4rem rgba(13, 59, 68, 0.16);
	}

	.shop-stall-card__title,
	.shop-stall-card__person,
	.shop-stall-card__description,
	.shop-stall-card__preorder {
		display: block;
	}

	.shop-stall-card__title {
		font-size: 1.35rem;
		font-weight: 700;
		line-height: 1.18;
	}

	.shop-stall-card__title::after {
		content: '';
		display: block;
		width: 4rem;
		height: 2px;
		margin-top: 0.6rem;
		background: #8d627b;
	}

	.shop-stall-card__person {
		margin-top: 0.85rem;
		font-family: Lora, serif;
		font-size: 1rem;
		font-style: italic;
	}

	.shop-stall-card__description {
		display: -webkit-box;
		margin-top: 0.8rem;
		overflow: hidden;
		color: #31545b;
		font-size: 0.95rem;
		line-height: 1.5;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		line-clamp: 3;
	}

	.shop-stall-card__preorder {
		margin-top: 0.9rem;
		color: #8d627b;
		font-family: Lora, serif;
		font-size: 0.95rem;
		font-style: italic;
		font-weight: 700;
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

		.shop-stalls {
			grid-template-columns: 1fr;
		}
	}
</style>
