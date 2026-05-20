<script lang="ts">
	import { onMount } from 'svelte';
	import { encodeQuery, fetchBasic } from '../services/api';

	const storage_url = import.meta.env.VITE_STORAGE_URL;

	type StrapiImage = {
		url: string;
	};

	let {
		status,
		title,
		message
	}: {
		status: number | string;
		title: string;
		message: string;
	} = $props();

	let errorImageUrl = $state('');

	function getStrapiMediaUrl(image?: StrapiImage | null): string {
		if (!image?.url) return '';

		if (image.url.startsWith('http')) {
			return image.url;
		}

		return `${storage_url}${image.url}`;
	}

	onMount(async () => {
		const errorImagePath = `/upload/files?${encodeQuery({
			filters: {
				name: {
					$eq: 'error.png'
				}
			}
		})}`;

		const images = await fetchBasic(errorImagePath);
		errorImageUrl = getStrapiMediaUrl(images?.[0]);
	});
</script>

<section class="section error-page">
	<div class="container">
		<div class="error-card">
			{#if errorImageUrl}
				<img src={errorImageUrl} alt="Oso bailando" class="error-card__image" />
			{/if}

			<p class="error-card__number">{status}</p>

			<div class="error-card__content">
				<h1 class="error-card__title">{title}</h1>
				<p class="error-card__message">{message}</p>

				<a href="/" class="button is-primary error-card__button">Volver al inicio</a>
			</div>
		</div>
	</div>
</section>

<style>
	.error-page {
		display: flex;
		align-items: center;
		min-height: calc(100vh - 6rem);
		padding-top: 2rem;
		padding-bottom: 4rem;
	}

	.error-card {
		position: relative;
		max-width: 52rem;
		margin-right: auto;
		margin-left: auto;
		padding: 2.25rem 1.5rem 1.9rem;
		overflow: hidden;
		border: 1px solid rgba(18, 63, 70, 0.12);
		border-radius: 1.25rem;
		background:
			radial-gradient(circle at 50% 0%, rgba(215, 181, 109, 0.16), transparent 20rem),
			rgba(255, 255, 255, 0.84);
		box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.06);
		backdrop-filter: blur(8px);
		text-align: center;
	}

	.error-card::before {
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

	.error-card__image {
		position: relative;
		z-index: 1;
		display: block;
		width: min(100%, 28rem);
		height: auto;
		margin: 0 auto 0.4rem;
	}

	.error-card__number {
		margin: 0;
		color: #d7b56d;
		font-family: var(--bulma-family-primary, inherit);
		font-size: clamp(5.6rem, 14.4vw, 10.4rem);
		font-weight: 900;
		line-height: 0.82;
		text-align: center;
		text-shadow: 0 0.35rem 1rem rgba(77, 43, 19, 0.16);
	}

	.error-card__content {
		max-width: 38rem;
		margin: 0 auto;
		padding: 0 1rem 0.35rem;
	}

	.error-card__title {
		margin: 0 0 0.65rem;
		color: #0d3b44;
		font-family: var(--bulma-family-primary, inherit);
		font-size: 1.55rem;
		line-height: 1.2;
		text-align: center;
		text-transform: uppercase;
	}

	.error-card__message {
		margin: 0;
		color: rgba(18, 63, 70, 0.82);
		font-size: 1.08rem;
		line-height: 1.55;
		text-align: center;
	}

	.error-card__button {
		margin-top: 1.6rem;
		height: auto;
		min-height: 2.75rem;
		padding: 0.75rem 1.4rem;
		border-radius: 999px;
		font-family: var(--bulma-family-primary, inherit);
		font-weight: 800;
		line-height: 1.2;
		white-space: normal;
	}

	@media screen and (max-width: 768px) {
		.error-page {
			min-height: calc(100vh - 4rem);
			padding-top: 1.5rem;
			padding-bottom: 3rem;
		}

		.error-card {
			padding: 1.5rem 1rem 1.35rem;
			border-radius: 1rem;
		}

		.error-card__image {
			width: min(100%, 20rem);
			margin-bottom: 0.35rem;
		}

		.error-card__number {
			font-size: clamp(4.4rem, 27.2vw, 6.4rem);
		}

		.error-card__content {
			padding: 0 0.25rem 0.25rem;
		}

		.error-card__title {
			font-size: 1.25rem;
		}

		.error-card__message {
			font-size: 1rem;
			line-height: 1.5;
		}

		.error-card__button {
			width: 100%;
		}
	}
</style>
