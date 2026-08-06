<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';

	const storage_url = import.meta.env.VITE_STORAGE_URL;

	type StallLink = {
		label: string;
		url: string;
	};

	type StallImage = {
		url: string;
		alternativeText?: string;
		name?: string;
	};

	type Stall = {
		name: string;
		person?: string;
		description?: string;
		descriptions?: string[];
		preorderContact?: string;
		links?: StallLink[];
		images?: StallImage[];
	};

	const markdownOptions = { mangle: false } as any;

	let { isOpen, close, stall } = $props<{
		isOpen: boolean;
		close: () => void;
		stall: Stall;
	}>();

	let activeImageIndex = $state(0);

	function getStrapiMediaUrl(image?: StallImage): string {
		if (!image?.url) return '';

		if (image.url.startsWith('http')) {
			return image.url;
		}

		return `${storage_url}${image.url}`;
	}

	function previousImage() {
		const images = stall.images ?? [];
		activeImageIndex = activeImageIndex === 0 ? images.length - 1 : activeImageIndex - 1;
	}

	function nextImage() {
		const images = stall.images ?? [];
		activeImageIndex = activeImageIndex === images.length - 1 ? 0 : activeImageIndex + 1;
	}
</script>

{#if isOpen}
	<div role="dialog" class="modal shop-stall-modal">
		<div class="modal-background"></div>

		<div class="modal-card shop-stall-modal__card">
			<header class="modal-card-head shop-stall-modal__head">
				<div>
					<p class="modal-card-title shop-stall-modal__title">{stall.name}</p>

					{#if stall.person}
						<p class="shop-stall-modal__subtitle">{stall.person}</p>
					{/if}
				</div>

				<button onclick={close} class="delete shop-stall-modal__close" aria-label="close"></button>
			</header>

			<section class="modal-card-body shop-stall-modal__body">
				<div class="content shop-stall-modal__content">
					{#if (stall.descriptions?.length ?? 0) > 0}
						{#each stall.descriptions ?? [] as description}
							<SvelteMarkdown options={markdownOptions} source={description} />
						{/each}
					{:else if stall.description}
						<SvelteMarkdown options={markdownOptions} source={stall.description} />
					{/if}
				</div>

				{#if stall.preorderContact}
					<div class="shop-stall-modal__contact">
						<span class="shop-stall-modal__contact-label">Contacto para encargos previos</span>
						<span class="shop-stall-modal__contact-value">{stall.preorderContact}</span>
					</div>
				{/if}

				{#if (stall.links?.length ?? 0) > 0}
					<div class="shop-stall-modal__links">
						{#each stall.links as link}
							<a class="shop-stall-modal__link" href={link.url} target="_blank" rel="noreferrer">
								{link.label}
							</a>
						{/each}
					</div>
				{/if}

				{#if (stall.images?.length ?? 0) > 0}
					<div class="shop-stall-modal__gallery">
						{#if stall.images.length > 1}
							<button
								class="shop-stall-modal__gallery-button shop-stall-modal__gallery-button--prev"
								type="button"
								aria-label="Imagen anterior"
								onclick={previousImage}
							>
								‹
							</button>
						{/if}

						<img
							src={getStrapiMediaUrl(stall.images[activeImageIndex])}
							alt={stall.images[activeImageIndex].alternativeText ?? stall.name}
						/>

						{#if stall.images.length > 1}
							<button
								class="shop-stall-modal__gallery-button shop-stall-modal__gallery-button--next"
								type="button"
								aria-label="Imagen siguiente"
								onclick={nextImage}
							>
								›
							</button>

							<p class="shop-stall-modal__gallery-count">
								{activeImageIndex + 1} / {stall.images.length}
							</p>
						{/if}
					</div>
				{/if}
			</section>
		</div>
	</div>
{/if}

<style>
	.shop-stall-modal {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		pointer-events: auto;
	}

	.shop-stall-modal__card {
		position: relative;
		overflow: hidden;
		width: min(92vw, 760px);
		border: 1px solid rgba(13, 59, 68, 0.16);
		border-radius: 0.5rem;
		box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.28);
	}

	.shop-stall-modal__card::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		z-index: 1;
		height: 0.35rem;
		background: linear-gradient(90deg, #0d3b44, #8d627b, #43b2dc);
	}

	.shop-stall-modal__head {
		position: relative;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 2rem 4rem 1.4rem 2rem;
		background:
			linear-gradient(rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.96)),
			radial-gradient(circle at top right, rgba(141, 98, 123, 0.18), transparent 42%);
		border-bottom: 1px solid rgba(13, 59, 68, 0.1);
	}

	.shop-stall-modal__title {
		margin: 0;
		font-size: 1.55rem;
		line-height: 1.25;
		color: #0d3b44;
		flex-grow: initial;
		flex-shrink: initial;
	}

	.shop-stall-modal__title::after {
		content: '';
		display: block;
		width: 4rem;
		height: 2px;
		margin-top: 0.75rem;
		background: #8d627b;
	}

	.shop-stall-modal__subtitle {
		margin-top: 0.8rem;
		margin-bottom: 0;
		font-family: Lora, serif;
		font-size: 1.1rem;
		font-style: italic;
		color: #0d3b44;
	}

	.shop-stall-modal__close {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		z-index: 2;
	}

	.shop-stall-modal__body {
		padding: 1.8rem 2rem 2rem;
		background: #ffffff;
	}

	.shop-stall-modal__content {
		color: #0d3b44;
	}

	.shop-stall-modal__contact {
		display: grid;
		gap: 0.25rem;
		margin-top: 1.25rem;
		padding: 0.85rem 1rem;
		border-left: 4px solid #8d627b;
		background: rgba(141, 98, 123, 0.1);
		color: #0d3b44;
	}

	.shop-stall-modal__contact-label {
		font-size: 0.78rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.shop-stall-modal__contact-value {
		font-family: Lora, serif;
		font-size: 1rem;
	}

	.shop-stall-modal__links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1.25rem;
	}

	.shop-stall-modal__link {
		display: inline-flex;
		width: fit-content;
		padding: 0.45rem 0.8rem;
		color: #ffffff;
		background: #0d3b44;
		border-left: 4px solid #8d627b;
		font-size: 0.85rem;
		font-weight: 700;
	}

	.shop-stall-modal__link:hover {
		color: #ffffff;
		background: #8d627b;
	}

	.shop-stall-modal__gallery {
		position: relative;
		margin-top: 1.8rem;
		overflow: hidden;
		border-radius: 0.45rem;
		background: #0d3b44;
		box-shadow: 0 1rem 2rem rgba(13, 59, 68, 0.16);
	}

	.shop-stall-modal__gallery img {
		display: block;
		width: 100%;
		max-height: min(62vh, 32rem);
		object-fit: contain;
		background: #0d3b44;
	}

	.shop-stall-modal__gallery-button {
		position: absolute;
		top: 50%;
		z-index: 2;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.4rem;
		height: 2.4rem;
		border: 0;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.9);
		color: #0d3b44;
		font-size: 1.8rem;
		line-height: 1;
		transform: translateY(-50%);
		cursor: pointer;
	}

	.shop-stall-modal__gallery-button--prev {
		left: 0.8rem;
	}

	.shop-stall-modal__gallery-button--next {
		right: 0.8rem;
	}

	.shop-stall-modal__gallery-count {
		position: absolute;
		right: 0.8rem;
		bottom: 0.8rem;
		z-index: 2;
		margin: 0;
		padding: 0.3rem 0.55rem;
		border-radius: 999px;
		background: rgba(8, 33, 38, 0.62);
		color: #ffffff;
		font-size: 0.75rem;
		line-height: 1;
	}

	@media screen and (max-width: 768px) {
		.shop-stall-modal {
			padding: 0.75rem;
		}

		.shop-stall-modal__head {
			padding: 1.6rem 3.75rem 1.2rem 1.25rem;
		}

		.shop-stall-modal__title {
			font-size: 1.25rem;
		}

		.shop-stall-modal__body {
			padding: 1.4rem 1.25rem 1.6rem;
		}

		.shop-stall-modal__close {
			top: 1.15rem;
			right: 1.15rem;
			display: block !important;
			z-index: 10;
			width: 32px;
			height: 32px;
			min-width: 32px;
			min-height: 32px;
		}
	}
</style>
