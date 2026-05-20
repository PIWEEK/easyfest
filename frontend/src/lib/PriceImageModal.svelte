<script lang="ts">
	type ModalImage = {
		url: string;
		alt: string;
	};

	let {
		isOpen,
		close,
		title,
		short_description = '',
		images = [],
		tag1 = '',
		imageZoom = false,
		unavailableText = 'La imagen todavía no está disponible.'
	}: {
		isOpen: boolean;
		close: () => void;
		title: string;
		short_description?: string;
		images?: ModalImage[];
		tag1?: string;
		imageZoom?: boolean;
		unavailableText?: string;
	} = $props();

	let zoomImage = $state('');

	function openZoom(url: string) {
		if (!imageZoom) return;

		zoomImage = url;
	}

	function closeZoom() {
		zoomImage = '';
	}
</script>

{#if isOpen}
	<div role="dialog" class="modal price-image-modal">
		<div class="modal-background"></div>

		<div class="modal-card price-image-modal__card" class:price-image-modal__card--zoom={imageZoom}>
			<header class="modal-card-head price-image-modal__head">
				<div>
					<p class="modal-card-title price-image-modal__title">{title}</p>

					{#if short_description}
						<p class="price-image-modal__subtitle">{short_description}</p>
					{/if}
				</div>

				<button onclick={close} class="delete price-image-modal__close" aria-label="close"></button>
			</header>

			<section class="modal-card-body price-image-modal__body">
				{#if images.length > 0}
					<div
						class="price-image-modal__images"
						class:price-image-modal__images--zoom={imageZoom}
						class:price-image-modal__images--single={images.length === 1}
					>
						{#each images as image}
							{#if imageZoom}
								<button
									class="price-image-modal__image-button"
									type="button"
									onclick={() => openZoom(image.url)}
									aria-label="Ampliar imagen"
								>
									<img src={image.url} alt={image.alt} />
								</button>
							{:else}
								<img src={image.url} alt={image.alt} />
							{/if}
						{/each}
					</div>
				{:else}
					<p class="price-image-modal__empty">{unavailableText}</p>
				{/if}
			</section>

			{#if tag1}
				<footer class="modal-card-foot price-image-modal__foot">
					<span class="price-image-modal__tag">{tag1}</span>
				</footer>
			{/if}
		</div>
	</div>

	{#if zoomImage}
		<div class="price-image-modal__zoom" role="dialog" aria-label="Imagen ampliada">
			<button
				class="price-image-modal__zoom-backdrop"
				type="button"
				aria-label="Cerrar imagen ampliada"
				onclick={closeZoom}
			></button>

			<button
				class="price-image-modal__zoom-close"
				onclick={closeZoom}
				aria-label="Cerrar imagen ampliada"
			>
			</button>

			<div class="price-image-modal__zoom-frame">
				<img src={zoomImage} alt="" />
			</div>
		</div>
	{/if}
{/if}

<style>
	.price-image-modal {
		position: fixed;
		inset: 0;
		z-index: 40;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		pointer-events: auto;
	}

	.price-image-modal__card {
		position: relative;
		overflow: hidden;
		width: min(92vw, 760px);
		border: 1px solid rgba(13, 59, 68, 0.16);
		border-radius: 0.5rem;
		background: #ffffff;
		box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.28);
	}

	.price-image-modal__card--zoom {
		width: min(96vw, 1120px);
	}

	.price-image-modal__card::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		z-index: 1;
		height: 0.35rem;
		background: linear-gradient(90deg, #0d3b44, #43b2dc, #8d627b);
	}

	.price-image-modal__head {
		position: relative;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 2rem 4rem 1.4rem 2rem;
		border-bottom: 1px solid rgba(13, 59, 68, 0.1);
		background:
			linear-gradient(rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.96)),
			radial-gradient(circle at top right, rgba(67, 178, 220, 0.2), transparent 42%);
	}

	.price-image-modal__title {
		margin: 0;
		color: #0d3b44;
		font-size: 1.55rem;
		line-height: 1.25;
	}

	.price-image-modal__title::after {
		content: '';
		display: block;
		width: 4rem;
		height: 2px;
		margin-top: 0.75rem;
		background: #43b2dc;
	}

	.price-image-modal__subtitle {
		margin: 0.8rem 0 0;
		color: #0d3b44;
		font-family: Lora, serif;
		font-size: 1rem;
		font-style: italic;
	}

	.price-image-modal__close {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		z-index: 2;
	}

	.price-image-modal__body {
		padding: 1.8rem 2rem 2rem;
		background: #ffffff;
	}

	.price-image-modal__card--zoom .price-image-modal__body {
		max-height: 76vh;
		overflow: auto;
	}

	.price-image-modal__images {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: center;
		justify-content: center;
	}

	.price-image-modal__images img {
		display: block;
		width: min(100%, 17rem);
		height: auto;
		border-radius: 0.35rem;
		box-shadow: 0 1rem 2rem rgba(13, 59, 68, 0.16);
	}

	.price-image-modal__images--single img {
		width: min(100%, 34rem);
	}

	.price-image-modal__image-button {
		display: block;
		width: min(100%, 68rem);
		padding: 0;
		border: 0;
		background: transparent;
		cursor: zoom-in;
	}

	.price-image-modal__image-button img {
		width: 100%;
		cursor: zoom-in;
	}

	.price-image-modal__empty {
		margin: 0;
		color: #0d3b44;
	}

	.price-image-modal__foot {
		display: block;
		padding: 1.15rem 2rem 1.35rem;
		border-top: 0;
		background: #0d3b44;
	}

	.price-image-modal__tag {
		display: inline-flex;
		width: fit-content;
		padding: 0.35rem 0.75rem;
		border-left: 4px solid #43b2dc;
		background: #8d627b;
		color: #ffffff;
		font-size: 0.75rem;
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}

	.price-image-modal__zoom {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: 4.75rem 2rem 2rem;
		overflow: auto;
		background: rgba(4, 18, 22, 0.92);
		touch-action: pan-x pan-y;
	}

	.price-image-modal__zoom-backdrop {
		position: fixed;
		inset: 0;
		border: 0;
		background: transparent;
		cursor: zoom-out;
	}

	.price-image-modal__zoom-frame {
		position: relative;
		z-index: 1;
		width: max-content;
		max-width: none;
		min-width: min(100%, 20rem);
	}

	.price-image-modal__zoom-frame img {
		display: block;
		width: auto;
		max-width: none;
		height: auto;
		max-height: none;
		margin: 0 auto;
		background: #ffffff;
		box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.45);
	}

	.price-image-modal__zoom-close {
		position: fixed;
		top: 1rem;
		left: 50%;
		z-index: 10000;
		display: block !important;
		width: 40px;
		height: 40px;
		min-width: 40px;
		min-height: 40px;
		padding: 0;
		border: 0;
		border-radius: 999px;
		background: #ffffff;
		box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.35);
		cursor: pointer;
		opacity: 1;
		transform: translateX(-50%);
	}

	.price-image-modal__zoom-close::before,
	.price-image-modal__zoom-close::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		display: block;
		width: 16px;
		height: 2px;
		background: #0d3b44;
		transform-origin: center;
	}

	.price-image-modal__zoom-close::before {
		transform: translate(-50%, -50%) rotate(45deg);
	}

	.price-image-modal__zoom-close::after {
		transform: translate(-50%, -50%) rotate(-45deg);
	}

	@media screen and (max-width: 768px) {
		.price-image-modal {
			padding: 0.75rem;
		}

		.price-image-modal__head {
			padding: 1.6rem 3.75rem 1.2rem 1.25rem;
		}

		.price-image-modal__title {
			font-size: 1.25rem;
		}

		.price-image-modal__body {
			padding: 1.4rem 1.25rem 1.6rem;
		}

		.price-image-modal__close {
			top: 1.15rem;
			right: 1.15rem;
			display: block !important;
			z-index: 10;
			width: 32px;
			height: 32px;
			min-width: 32px;
			min-height: 32px;
		}

		.price-image-modal__images--single img {
			width: min(100%, 17rem);
		}

		.price-image-modal__image-button {
			width: min(100%, 42rem);
		}

		.price-image-modal__zoom {
			padding: 4rem 0.75rem 0.75rem;
		}

		.price-image-modal__zoom-close {
			top: 0.75rem;
			left: 50%;
		}

		.price-image-modal__zoom-frame {
			min-width: 100%;
		}

		.price-image-modal__zoom-frame img {
			min-width: 100%;
		}
	}
</style>
