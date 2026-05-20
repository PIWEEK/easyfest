<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import { modals } from 'svelte-modals';
	import * as m from '$lib/paraglide/messages.js';
	import PriceImageModal from '$lib/PriceImageModal.svelte';
	import roomImage from '../../assets/images/camarote.jpeg';
	import treasureImage from '../../assets/images/tesoro.jpeg';

	const storage_url = import.meta.env.VITE_STORAGE_URL;

	type Price = {
		name: string;
		description: string;
		value: number | string;
		currency: string;
	};

	type StrapiImage = {
		url: string;
		alternativeText?: string;
		caption?: string;
		name?: string;
	};

	interface Data {
		prices: Price[];
		content?: string;
		tshirtImages?: StrapiImage[];
		allIncludedPriceCard?: StrapiImage | null;
	}

	export let data: Data;

	function getNumericValue(value: number | string): number {
		if (typeof value === 'number') return value;

		const normalizedValue = String(value)
			.replace(',', '.')
			.replace(/[^\d.]/g, '');
		const parsedValue = Number(normalizedValue);

		return Number.isNaN(parsedValue) ? 0 : parsedValue;
	}

	function isPricePending(value: number | string): boolean {
		return getNumericValue(value) === 0;
	}

	function getAccommodationOrder(price: Price): number {
		const name = price.name.toLowerCase();

		if (name.includes('individual')) return 1;
		if (name.includes('doble')) return 2;
		if (name.includes('triple')) return 3;
		if (name.includes('cuádruple') || name.includes('cuadruple')) return 4;

		return 99;
	}

	function isTshirtPrice(price: Price): boolean {
		return price.name.toLowerCase().includes('camiseta');
	}

	function isAllIncludedPrice(price: Price): boolean {
		const normalizedName = price.name
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '');

		return normalizedName.includes('todo incluido');
	}

	function getStrapiMediaUrl(image?: StrapiImage | null): string {
		if (!image?.url) return '';

		if (image.url.startsWith('http')) {
			return image.url;
		}

		return `${storage_url}${image.url}`;
	}

	function openTshirtModal(price: Price) {
		const tshirtImageUrls = (data.tshirtImages ?? [])
			.map((image) => getStrapiMediaUrl(image))
			.filter(Boolean);

		modals.open(PriceImageModal, {
			title: price.name,
			short_description: price.description,
			images: tshirtImageUrls.map((url, index) => ({
				url,
				alt: index === 0 ? 'Diseño delantero de la camiseta' : 'Diseño trasero de la camiseta'
			})),
			tag1: 'Diseño',
			imageZoom: true,
			unavailableText: 'El diseño de la camiseta todavía no está disponible.'
		});
	}

	function openAllIncludedModal(price: Price) {
		const priceCardUrl = getStrapiMediaUrl(data.allIncludedPriceCard);

		modals.open(PriceImageModal, {
			title: price.name,
			short_description: price.description,
			images: priceCardUrl
				? [
						{
							url: priceCardUrl,
							alt: 'Carta de precios todo incluido'
						}
					]
				: [],
			tag1: 'Carta de precios',
			imageZoom: true,
			unavailableText: 'La carta de precios todavía no está disponible.'
		});
	}

	$: accommodationPrices = (
		data.prices?.filter((price) => getNumericValue(price.value) > 100) ?? []
	).sort((a, b) => getAccommodationOrder(a) - getAccommodationOrder(b));

	$: premiumPrices = (
		data.prices?.filter((price) => getNumericValue(price.value) <= 100) ?? []
	).sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
</script>

<section class="hero page-title">
	<h3 class="title">{m.prices()}</h3>
</section>

<section class="section prices-page">
	<div class="container">
		{#if data.content}
			<div class="content content-border prices-intro">
				<div class="columns">
					<div class="column is-four-fifths">
						<SvelteMarkdown options={{ mangle: false }} source={data.content} />
					</div>
				</div>
			</div>
		{/if}

		<div class="prices-treasure" aria-hidden="true">
			<div class="prices-treasure__image">
				<img src={roomImage} alt="" />
				<span class="prices-treasure__credit">© Eduardo Francisco</span>
			</div>

			<div class="prices-treasure__content">
				<p class="prices-treasure__title">Elige tu camarote para la travesía</p>

				<div class="strapi-markdown prices-treasure__text">
					<p>Consulta aquí los precios de las habitaciones antes de la inscripción.</p>
				</div>
			</div>
		</div>

		{#if accommodationPrices.length > 0}
			<section
				class="prices-block prices-block--accommodation"
				aria-labelledby="accommodation-prices-title"
			>
				<div class="prices-block__header">
					<div>
						<h4 id="accommodation-prices-title" class="prices-block__title">Habitaciones</h4>
					</div>
				</div>

				<div class="prices-card-list">
					{#each accommodationPrices as priceObj}
						<article class="prices-card">
							<div class="prices-card__content">
								<h5>{priceObj.name}</h5>

								{#if priceObj.description}
									<p>{priceObj.description}</p>
								{/if}
							</div>

							<div
								class="prices-card__amount"
								class:prices-card__amount--pending={isPricePending(priceObj.value)}
							>
								{#if isPricePending(priceObj.value)}
									<span>PRECIO POR DETERMINAR</span>
								{:else}
									<span>{priceObj.value}</span>
									<small>{priceObj.currency}</small>
								{/if}
							</div>
						</article>
					{/each}
				</div>
			</section>
		{/if}

		{#if accommodationPrices.length > 0 && premiumPrices.length > 0}
			<div class="prices-treasure prices-treasure--between" aria-hidden="true">
				<div class="prices-treasure__image">
					<img src={treasureImage} alt="" />
					<span class="prices-treasure__credit">© Valera Lutfullina</span>
				</div>

				<div class="prices-treasure__content">
					<p class="prices-treasure__title">Añade extras a tu travesía</p>

					<div class="strapi-markdown prices-treasure__text">
						<p>
							Además del alojamiento, puedes consultar aquí los complementos premium disponibles
							para añadir a tu inscripción.
						</p>
					</div>
				</div>
			</div>
		{/if}

		{#if premiumPrices.length > 0}
			<section class="prices-block prices-block--premium" aria-labelledby="premium-prices-title">
				<div class="prices-block__header">
					<div>
						<h4 id="premium-prices-title" class="prices-block__title">Inscripción premium</h4>
					</div>
				</div>

				<div class="prices-card-list">
					{#each premiumPrices as priceObj}
						{#if isTshirtPrice(priceObj)}
							<button
								class="prices-card prices-card--clickable"
								type="button"
								onclick={() => openTshirtModal(priceObj)}
							>
								<div class="prices-card__content">
									<h5>{priceObj.name}</h5>

									{#if priceObj.description}
										<p>{priceObj.description}</p>
									{/if}
								</div>

								<div
									class="prices-card__amount"
									class:prices-card__amount--pending={isPricePending(priceObj.value)}
								>
									{#if isPricePending(priceObj.value)}
										<span>PRECIO POR DETERMINAR</span>
									{:else}
										<span>{priceObj.value}</span>
										<small>{priceObj.currency}</small>
									{/if}
								</div>
							</button>
						{:else if isAllIncludedPrice(priceObj)}
							<button
								class="prices-card prices-card--clickable prices-card--price-card"
								type="button"
								onclick={() => openAllIncludedModal(priceObj)}
							>
								<div class="prices-card__content">
									<h5>{priceObj.name}</h5>

									{#if priceObj.description}
										<p>{priceObj.description}</p>
									{/if}
								</div>

								<div
									class="prices-card__amount"
									class:prices-card__amount--pending={isPricePending(priceObj.value)}
								>
									{#if isPricePending(priceObj.value)}
										<span>PRECIO POR DETERMINAR</span>
									{:else}
										<span>{priceObj.value}</span>
										<small>{priceObj.currency}</small>
									{/if}
								</div>
							</button>
						{:else}
							<article class="prices-card">
								<div class="prices-card__content">
									<h5>{priceObj.name}</h5>

									{#if priceObj.description}
										<p>{priceObj.description}</p>
									{/if}
								</div>

								<div
									class="prices-card__amount"
									class:prices-card__amount--pending={isPricePending(priceObj.value)}
								>
									{#if isPricePending(priceObj.value)}
										<span>PRECIO POR DETERMINAR</span>
									{:else}
										<span>{priceObj.value}</span>
										<small>{priceObj.currency}</small>
									{/if}
								</div>
							</article>
						{/if}
					{/each}
				</div>
			</section>
		{/if}
	</div>
</section>

<style>
	.prices-page {
		padding-top: 2rem;
		padding-bottom: 4rem;
	}

	.prices-intro {
		margin-bottom: 2rem;
	}

	.prices-treasure {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 0.45fr) minmax(0, 1.55fr);
		gap: 1.5rem;
		align-items: center;
		margin: 0 0 2.5rem;
		padding: 1.1rem;
		overflow: hidden;
		border: 1px solid rgba(18, 63, 70, 0.1);
		border-radius: 1.5rem;
		background:
			radial-gradient(circle at 12% 18%, rgba(215, 181, 109, 0.16), transparent 16rem),
			rgba(255, 255, 255, 0.76);
		box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.05);
		backdrop-filter: blur(8px);
		text-align: left;
	}

	.prices-treasure--between {
		margin-top: 2.5rem;
		margin-bottom: 0;
	}

	.prices-treasure::before {
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

	.prices-treasure::after {
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

	.prices-treasure__image {
		position: relative;
		height: 11rem;
		overflow: hidden;
		border-radius: 1.15rem;
		background: var(--bulma-dark, #123f46);
	}

	.prices-treasure__image::after {
		content: '';
		position: absolute;
		inset: 0;
		background:
			linear-gradient(90deg, rgba(18, 63, 70, 0.2), transparent 45%),
			linear-gradient(180deg, transparent 40%, rgba(18, 63, 70, 0.35));
		pointer-events: none;
	}

	.prices-treasure__image img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.prices-treasure__credit {
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

	.prices-treasure__content {
		width: 90%;
		max-width: none;
	}

	.prices-treasure__title {
		margin: 0 0 0.55rem;
		color: var(--bulma-dark, #123f46);
		font-family: var(--bulma-family-primary, inherit);
		font-size: 1.65rem;
		line-height: 1.15;
		text-align: left;
	}

	.prices-treasure__text,
	.prices-treasure__text p {
		margin: 0;
		color: rgba(18, 63, 70, 0.78);
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
		text-align: left;
	}

	.prices-block {
		margin-top: 2.5rem;
	}

	.prices-block:first-of-type {
		margin-top: 0;
	}

	.prices-block__header {
		display: flex;
		gap: 2rem;
		align-items: flex-end;
		justify-content: space-between;
		margin-bottom: 1.25rem;
	}

	.prices-block__title {
		margin: 0;
		color: var(--bulma-dark, #123f46);
		font-family: var(--bulma-family-primary, inherit);
		font-size: 1.8rem;
		line-height: 1.15;
	}

	.prices-card-list {
		overflow: hidden;
		border: 1px solid rgba(18, 63, 70, 0.1);
		border-radius: 1.25rem;
		background: rgba(255, 255, 255, 0.78);
		box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.05);
		backdrop-filter: blur(8px);
	}

	.prices-card {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 2rem;
		align-items: center;
		width: 100%;
		padding: 1.25rem 1.35rem;
		border: 0;
		border-bottom: 1px solid rgba(18, 63, 70, 0.1);
		background: transparent;
		font: inherit;
		text-align: left;
		transition: background 180ms ease;
	}

	.prices-card:last-child {
		border-bottom: 0;
	}

	.prices-card::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 3px;
		background: transparent;
		transition: background 180ms ease;
	}

	.prices-card:hover {
		background: rgba(255, 255, 255, 0.92);
	}

	.prices-block--accommodation .prices-card:hover::before {
		background: #2f6f8f;
	}

	.prices-block--premium .prices-card:hover::before {
		background: #d7b56d;
	}

	.prices-card--clickable {
		cursor: pointer;
	}

	.prices-card--clickable .prices-card__content::after {
		content: 'Pulsa aquí para ver el diseño';
		display: inline-flex;
		margin-top: 0.55rem;
		color: #b06b2d;
		font-family: var(--bulma-family-primary, inherit);
		font-size: 0.85rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.prices-card--price-card .prices-card__content::after {
		content: 'Pulsa aquí para ver la carta de precios';
	}

	.prices-card__content {
		max-width: calc(100% - 2rem);
		padding-right: 2rem;
		text-align: left;
	}

	.prices-card__content h5 {
		margin: 0 0 0.35rem;
		color: var(--bulma-dark, #123f46);
		font-family: var(--bulma-family-primary, inherit);
		font-size: 1.2rem;
		line-height: 1.25;
		text-align: left;
	}

	.prices-card__content p {
		max-width: 72%;
		margin: 0;
		color: rgba(18, 63, 70, 0.82);
		font-size: 1rem;
		line-height: 1.45;
		text-align: left;
	}

	.prices-card__amount {
		color: var(--bulma-dark, #123f46);
		font-family: var(--bulma-family-primary, inherit);
		font-weight: 600;
		text-align: right;
		white-space: nowrap;
	}

	.prices-card__amount span {
		display: block;
		font-size: 1.65rem;
		line-height: 1;
	}

	.prices-card__amount small {
		display: block;
		margin-top: 0.25rem;
		font-size: 0.9rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		opacity: 0.78;
	}

	.prices-card__amount--pending {
		max-width: 12rem;
		white-space: normal;
	}

	.prices-card__amount--pending span {
		font-size: 0.95rem;
		line-height: 1.2;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.prices-treasure p,
	.prices-treasure li,
	.prices-card p,
	.prices-card li {
		text-align: left;
		text-justify: auto;
		hyphens: none;
	}

	@media (max-width: 768px) {
		.prices-treasure {
			grid-template-columns: 1fr;
			gap: 1.25rem;
			padding: 1rem;
		}

		.prices-treasure__image {
			height: 10rem;
		}

		.prices-treasure__credit {
			right: 0.55rem;
			bottom: 0.55rem;
			padding: 0.24rem 0.48rem;
			font-size: 0.66rem;
		}

		.prices-treasure__content {
			width: 100%;
			max-width: 100%;
		}

		.prices-treasure__title {
			font-size: 1.4rem;
		}

		.prices-block__header {
			display: block;
		}

		.prices-card {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.prices-card__content {
			max-width: 100%;
			padding-right: 0;
		}

		.prices-card__content p {
			max-width: 100%;
		}

		.prices-card__amount {
			text-align: left;
		}

		.prices-card__amount--pending {
			max-width: 100%;
		}
	}
</style>
