<script>
	import { onMount } from 'svelte';
	import SvelteMarkdown from '@humanspeak/svelte-markdown';

	import heroLosPuertosGrises from '../assets/images/Los_Puertos_Grises.jpg';
	import Marquee from '../lib/Marquee';

	const storage_url = import.meta.env.VITE_STORAGE_URL;

	/**
	 * @typedef {Object} Props
	 * @property {import('./$types').PageData} data
	 */

	/** @type {Props} */
	let { data } = $props();

	/** @type {DateTimeFormatOptions} */
	const activityDateFormatOptions = {
		dateStyle: 'medium',
		timeStyle: 'short'
	};

	/** @type {HTMLDivElement} */
	let /* binded */ marqueeElement = $state();

	onMount(() => {
		if (!marqueeElement) return;
		new Marquee(marqueeElement, 50);
	});

	/** @type {HTMLDivElement} */
	let /* binded */ carousel = $state();

	/** @type {HTMLButtonElement} */
	let /* binded */ scrollLeftButton = $state();

	/** @type {HTMLButtonElement} */
	let /* binded */ scrollRightButton = $state();

	onMount(() => {
		if (!carousel) return;
		if (!scrollLeftButton) return;
		if (!scrollRightButton) return;

		const carouselItems = carousel.querySelectorAll('.carousel-item');
		if (!carouselItems.length) return;

		let isDragging = false;
		let startPosX = 0;
		let scrollLeft = 0;

		const carouselItemWidth = carouselItems[0].getBoundingClientRect().width;

		let scrollItemNumber = 1;
		if (window.innerWidth > 768) scrollItemNumber = 3;

		const eventHandlers = [
			{
				target: carousel,
				eventName: 'mousedown',
				listener: (e) => {
					isDragging = true;
					startPosX = e.clientX - carousel.offsetLeft;
					scrollLeft = carousel.scrollLeft;
				}
			},
			{
				target: carousel,
				eventName: 'mousemove',
				listener: (e) => {
					if (!isDragging) return;
					const mouseX = e.clientX - carousel.offsetLeft;
					const deltaX = mouseX - startPosX;
					carousel.scrollLeft = scrollLeft - deltaX;
				}
			},
			{
				target: carousel,
				eventName: 'mouseup',
				listener: () => {
					isDragging = false;
				}
			},
			{
				target: carousel,
				eventName: 'mouseleave',
				listener: () => {
					isDragging = false;
				}
			},
			{
				target: scrollLeftButton,
				eventName: 'click',
				listener: () => {
					carousel.scrollLeft -= carouselItemWidth * scrollItemNumber;
				}
			},
			{
				target: scrollRightButton,
				eventName: 'click',
				listener: () => {
					carousel.scrollLeft += carouselItemWidth * scrollItemNumber;
				}
			}
		];

		for (const { target, eventName, listener } of eventHandlers) {
			target.addEventListener(eventName, listener);
		}

		return () => {
			for (const { target, eventName, listener } of eventHandlers) {
				target.removeEventListener(eventName, listener);
			}
		};
	});

	const EVENT_STATUS = {
		HYPE: 'hype',
		PUBLIC: 'public',
		FINISHED: 'finished'
	};

	const { homepage, speakers, site, ...settings } = data;

	const REGISTRATION = {
		HIDDEN: 'hidden',
		SOON: 'soon',
		OPEN: 'open',
		FINISHED: 'finished'
	};

	const eventStartDate = new Date('2026-09-24T00:00:00');
	const today = new Date();
	const daysUntilEvent = Math.max(0, Math.ceil((eventStartDate - today) / (1000 * 60 * 60 * 24)));
	const eventStatus = settings.eventStatus ?? settings.event_status ?? EVENT_STATUS.HYPE;

	const heroImage = heroLosPuertosGrises;
</script>

<section class="hero hero-home home-hero">
	<div class="hero-body">
		<div class="container">
			<div class="home-hero__shell">
				<div class="home-hero__media">
					<img src={heroImage} alt={homepage?.title ?? 'Estelcon 2026'} />
				</div>

				<div class="home-hero__overlay"></div>
				<p class="home-hero__image-credit">© Ted Nasmith - And Aragorn Came</p>
				<div class="home-hero__content">
					<div class="home-hero__text">
						{#if homepage && homepage.title}
							<h1 class="title home-hero__title-main">
								{homepage.title}
							</h1>
						{/if}

						{#if homepage && homepage.subtitle}
							<h2 class="title home-hero__title-sub">
								{homepage.subtitle}
							</h2>
						{/if}

						{#if homepage && homepage.dates_and_location}
							<p class="home-hero__date">
								{homepage.dates_and_location}
							</p>

							<div class="home-hero__ornament" aria-hidden="true"></div>
						{/if}

						{#if homepage && homepage.richtitle}
							<div class="home-hero__intro">
								<SvelteMarkdown options={{ mangle: false }} source={homepage.richtitle} />
							</div>
						{/if}

						<div class="home-hero__buttons">
							{#if eventStatus === EVENT_STATUS.HYPE}
								<span
									class="button home-hero__button-primary home-hero__button-primary--disabled"
									aria-disabled="true"
								>
									Pronto abriremos las inscripciones
								</span>
							{:else if eventStatus === EVENT_STATUS.PUBLIC}
								<a href="/inscripcion" class="button is-primary home-hero__button-primary">
									¡Inscripciones abiertas! <span aria-hidden="true"> →</span>
								</a>
							{:else if eventStatus === EVENT_STATUS.FINISHED}
								<p class="home-hero__registration-message">Inscripciones finalizadas</p>
							{/if}
						</div>
					</div>
				</div>

				<div class="home-hero__countdown">
					<span>Faltan</span>
					<strong>{daysUntilEvent}</strong>
					<span>días</span>
				</div>
			</div>
		</div>
	</div>
</section>

{#if homepage?.show_marquee_text && homepage?.marquee_text}
	<section class="home-news" aria-label="Novedades">
		<div class="container">
			<div class="home-news__card">
				<div class="home-news__label">
					<span aria-hidden="true">✦</span>
					<span>Novedades</span>
				</div>

				<div class="home-news__marquee-wrapper">
					<div bind:this={marqueeElement} class="marquee home-news__marquee">
						<div>{homepage.marquee_text}</div>
					</div>
				</div>
			</div>
		</div>
	</section>
{/if}

<section class="home-expectations">
	<div class="container">
		<div class="home-expectations__heading">
			<p class="title header--medium">Lo que te espera</p>
		</div>

		<div class="home-expectations__grid">
			<article class="home-expectations__card">
				<div class="home-expectations__icon">📜</div>
				<h3>Conferencias</h3>
				<p>
					Encuentros, conversaciones y reflexiones para compartir la obra de Tolkien desde distintas
					miradas.
				</p>
			</article>

			<article class="home-expectations__card">
				<div class="home-expectations__icon">🪶</div>
				<h3>Talleres</h3>
				<p>
					Actividades participativas para crear, aprender y disfrutar en comunidad durante el
					evento.
				</p>
			</article>

			<article class="home-expectations__card">
				<div class="home-expectations__icon">🎶</div>
				<h3>Conciertos y lecturas</h3>
				<p>Música, relatos y momentos compartidos en un ambiente cuidado junto al mar.</p>
			</article>

			<article class="home-expectations__card">
				<div class="home-expectations__icon">⚓</div>
				<h3>Más actividades</h3>
				<p>Artesanía, juegos y propuestas para vivir la Estelcon durante todo el día.</p>
			</article>
		</div>
	</div>
</section>

{#if homepage && homepage.about_section}
	{@const title = homepage.about_section.title}
	{@const image = homepage.about_section.image}
	{@const mdContent = homepage.about_section.content}
	<section id="sobre-el-evento" class="section">
		<div class="container">
			<div class="level columns">
				<div class="column">
					<p class="title header--medium">{title}</p>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="level columns">
				<div
					class="column is-three-fifths has-text-centered is-offset-one-fifth content is-size-6-mobile is-size-5"
				>
					<SvelteMarkdown options={{ mangle: false }} source={mdContent} />
				</div>
			</div>
		</div>
	</section>
{/if}

{#if settings.show_agenda && homepage.activities_section}
	{@const activities = homepage.activities_section}
	{@const featuredActivities = activities.featured_activities}
	{#if featuredActivities.length > 0}
		<section class="has-background-dark has-text-white">
			<div class="container p-6">
				<div class="level columns">
					<div class="column is-two-thirds">
						<p class="title header--medium has-text-white">{activities.title}</p>
						{#if activities.intro}
							<p class="subtitle text--large has-text-white">{activities.intro}</p>
						{/if}
					</div>
					<div class="column is-one-third">
						<div class="is-pulled-right">
							<a href="/agenda" class="button is-white is-outlined">{activities.agenda_link_text}</a
							>
						</div>
					</div>
				</div>
			</div>
			<div class="columns is-multiline featured-talks">
				{#each featuredActivities as activityWrapper}
					{@const activity = activityWrapper}
					<div class="column is-half border-color--secondary has-background-dark">
						<div
							class="featured-talks-item"
							style="height: 100%; display: flex; flex-direction: column"
						>
							{#if activity.start}
								{@const datetime = new Date(activity.start)}
								<p class="block has-text-white-ter">
									{datetime.toLocaleString(undefined, activityDateFormatOptions)}
								</p>
							{/if}
							<div class="block">
								{#if activity.tag2}
									<span
										class="tag has-background-secondary-light has-text-dark text--small--uppercase"
										>{activity.tag2}</span
									>
								{/if}
							</div>
							<p class="title header--small is-spaced has-text-white">{activity.title}</p>
							{#if activity.short_description}
								<p class="subtitle text--medium has-text-white">{activity.short_description}</p>
							{/if}
							<div class="block text--small" style="flex-grow: 1">
								{#each activity.public_faces as profileWrapper}
									{@const profile = profileWrapper}
									<p>
										<span style="text-decoration: underline">{profile.fullname}</span>, {profile.title}
									</p>
								{/each}
							</div>
							{#if activity.track}
								{@const track = activity.track}
								<div class="block has-text-white-ter">
									<p>{track.title} - {track.description}</p>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}
{/if}

{#if settings.show_speakers && homepage.speakers_section && speakers}
	{@const speakerSection = homepage.speakers_section}
	<section class="has-background-secondary-lighter">
		<div class="container p-6">
			<div class="level columns">
				<div class="column is-two-thirds">
					<p class="title header--medium">{speakerSection.title}</p>
				</div>
				<div class="column is-one-third">
					<div class="is-pulled-right">
						<button bind:this={scrollLeftButton} class="button is-ghost has-text-dark"
							>&larr;</button
						>
						<button bind:this={scrollRightButton} class="button is-ghost has-text-dark"
							>&rarr;</button
						>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div
				bind:this={carousel}
				class="carousel is-flex flex-wrap-nowrap py-1 is-justify-content-space-evenly is-align-items-stretch"
				style="margin: 0 auto"
			>
				{#each speakers as profileWrapper}
					{@const profile = profileWrapper}
					{@const picture = profile.photo}
					<article class="ml-4 carousel-item">
						<div style="position: relative">
							<figure class="image">
								<img src="{storage_url}{picture.url}" alt={picture.caption ?? profile.fullname} />
							</figure>
							{#if profile.is_guest}
								<span
									class="tag is-dark text--small--uppercase"
									style="position: absolute; right: 0; bottom: 12px">Special guest</span
								>
							{/if}
						</div>
						<div class="card-content px-0">
							<p class="title header--small is-spaced">{profile.fullname}</p>
							<div class="block">
								<p>{profile.title}</p>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
		<div class="level buttons p-6 is-centered">
			<a href="/speakers" class="button is-dark is-outlined">{speakerSection.speakers_link_text}</a>
		</div>
	</section>
{/if}

{#if settings.show_venue_info && homepage.locations_section}
	{@const locations = homepage.locations_section}
	<section class="block has-background-white">
		<div class="container p-6">
			<div>
				<p class="title header--medium">{locations.title}</p>
				{#if locations.intro}
					<p class="subtitle text--large">{locations.intro}</p>
				{/if}
			</div>
		</div>
		<div class="container">
			{#each locations.locations as location, index}
				{@const isEven = index % 2 === 0}
				{@const image = location.image}
				{@const badge = location.badge}
				{@const title = location.title}
				{@const mdContent = location.content}
				<div class="level columns" class:is-flex-direction-row-reverse={!isEven}>
					<div class="column is-half p-0">
						<figure class="image is-4by3">
							<img src="{storage_url}{image.url}" alt={image.caption} />
						</figure>
					</div>
					<div class="column is-half content p-6">
						<p class="tag has-background-primary-light text--small--uppercase">{badge}</p>
						<h1>{title}</h1>
						<SvelteMarkdown options={{ mangle: false }} source={mdContent} />
					</div>
				</div>
			{/each}
		</div>
	</section>
{/if}

{#if settings.show_accommodation_info && homepage.accommodation_section}
	{@const accommodation = homepage.accommodation_section}
	<section class="block has-background-white-bis">
		<div class="container py-6 px-6">
			<div>
				<p class="title header--medium">{accommodation.title}</p>
				{#if accommodation.intro}
					<p class="subtitle text--large">{accommodation.intro}</p>
				{/if}
			</div>
		</div>
		<div class="container">
			<div class="level columns is-multiline is-align-items-stretch px-6">
				{#each accommodation.places as place}
					{@const image = place.image}
					{@const title = place.title}
					{@const mdContent = place.content}
					<div class="column is-one-third">
						<figure class="image is-16by9">
							<img src="{storage_url}{image.url}" alt={image.caption} />
						</figure>
						<div class="py-3">
							<h1 class="title header--small">{title}</h1>
							<div class="content">
								<SvelteMarkdown options={{ mangle: false }} source={mdContent} />
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

{#if settings.show_newsletter_subscription}
	<section class="" style="background-image: url('/img/intheloop.png'); background-size: cover;">
		<div class="container p-6">
			<p class="title header--medium has-text-white">Stay in the loop</p>
			<p class="subtitle text--large has-text-white">
				Keep track of festival progress and latest news!
			</p>
		</div>
	</section>
{/if}

<style>
	/* =========================
	   GLOBAL
	   ========================= */

	img {
		width: 100%;
	}

	/* =========================
	   HOME HERO
	   ========================= */

	.home-hero {
		--home-gold: #d7b56d;
		--home-dark: var(--bulma-dark, #123f46);
		--home-dark-rgb: 7, 56, 64;

		position: relative;
		overflow: hidden;
		background: #f6f1e8;
	}

	.home-hero .hero-body {
		position: relative;
		z-index: 1;
		padding-top: 2rem;
		padding-bottom: 0;
	}

	.home-hero__shell {
		position: relative;
		overflow: hidden;
		min-height: 34rem;
		background: var(--home-dark);
		box-shadow: 0 0.8rem 1.8rem rgba(0, 0, 0, 0.1);
	}

	.home-hero__shell::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 3;
		pointer-events: none;
		opacity: 0.35;
		background-image:
			radial-gradient(
				circle at 18% 12%,
				rgba(255, 255, 255, 0.08) 0,
				rgba(255, 255, 255, 0.08) 1px,
				transparent 1px
			),
			radial-gradient(
				circle at 82% 28%,
				rgba(255, 255, 255, 0.08) 0,
				rgba(255, 255, 255, 0.08) 1px,
				transparent 1px
			);
		background-size:
			180px 180px,
			220px 220px;
	}

	.home-hero__shell::after {
		content: '';
		position: absolute;
		inset: 1rem;
		z-index: 3;
		border: 1px solid rgba(255, 255, 255, 0.12);
		pointer-events: none;
	}

	.home-hero__media,
	.home-hero__overlay {
		position: absolute;
		inset: 0;
	}

	.home-hero__media {
		z-index: 1;
	}

	.home-hero__media img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.home-hero__image-credit {
		position: absolute;
		top: 2rem;
		right: 2rem;
		z-index: 6;
		display: inline-flex;
		align-items: center;
		max-width: calc(100% - 4rem);
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

	.home-hero__overlay {
		z-index: 2;
		background:
			linear-gradient(
				90deg,
				rgba(var(--home-dark-rgb), 0.96) 0%,
				rgba(var(--home-dark-rgb), 0.88) 22%,
				rgba(var(--home-dark-rgb), 0.56) 42%,
				rgba(var(--home-dark-rgb), 0.16) 64%,
				rgba(var(--home-dark-rgb), 0.03) 100%
			),
			linear-gradient(
				180deg,
				rgba(var(--home-dark-rgb), 0.18) 0%,
				rgba(var(--home-dark-rgb), 0.04) 45%,
				rgba(var(--home-dark-rgb), 0.18) 100%
			);
	}

	.home-hero__content {
		position: relative;
		z-index: 4;
		max-width: 34rem;
		padding: 2rem 2rem 2.5rem;
		color: white;
	}

	.home-hero__text {
		max-width: 28rem;
	}

	.home-hero__title-main,
	.home-hero__title-sub {
		margin: 0;
		font-family: var(--bulma-family-primary, inherit);
		font-weight: 700;
		line-height: 0.95;
	}

	.home-hero__title-main {
		margin-bottom: 0.25rem;
		color: white;
		font-size: clamp(2.9rem, 5.5vw, 5rem);
	}

	.home-hero__title-sub {
		margin-bottom: 1rem;
		color: var(--home-gold);
		font-size: clamp(2.7rem, 5vw, 4.8rem);
	}

	.home-hero__date {
		margin: 0 0 1rem;
		color: rgba(255, 255, 255, 0.92);
		font-size: 1.15rem;
		line-height: 1.4;
	}

	.home-hero__ornament {
		width: 5.5rem;
		height: 1px;
		margin: -0.2rem 0 1rem;
		border-radius: 999px;
		background: linear-gradient(90deg, var(--home-gold), rgba(215, 181, 109, 0.55), transparent);
	}

	.home-hero__intro {
		max-width: 24rem;
		margin: 0 0 1.5rem;
		color: rgba(255, 255, 255, 0.92);
		font-size: 0.98rem;
		line-height: 1.6;
	}

	.home-hero__intro :global(p) {
		margin: 0;
		color: inherit;
		font-size: inherit;
		line-height: inherit;
	}

	.home-hero__intro :global(strong),
	.home-hero__intro :global(a) {
		color: var(--home-gold);
	}

	.home-hero__intro :global(a) {
		text-decoration: underline;
	}

	/* =========================
	   HOME HERO - BOTONES
	   ========================= */

	.home-hero__buttons {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.9rem;
		max-width: 100%;
	}

	.home-hero__button-primary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		max-width: 100%;
		height: auto;
		min-height: auto;
		border-color: var(--home-gold);
		background: var(--home-gold);
		color: var(--home-dark);
		font-weight: 700;
		white-space: normal;
		text-align: center;
		line-height: 1.25;
		box-shadow: 0 0.8rem 1.8rem rgba(0, 0, 0, 0.18);
	}

	.home-hero__button-primary:hover {
		border-color: var(--home-gold);
		background: var(--home-gold);
		color: var(--home-dark);
		filter: brightness(1.04);
		transform: translateY(-1px);
		box-shadow: 0 0.9rem 2rem rgba(0, 0, 0, 0.22);
	}

	.home-hero__button-arrow {
		display: inline-block;
		line-height: 1;
		transition: transform 180ms ease;
	}

	.home-hero__button-primary:hover .home-hero__button-arrow {
		transform: translateX(3px);
	}

	.home-hero__button-primary--disabled,
	.home-hero__button-primary--disabled:hover {
		cursor: not-allowed;
		background: rgba(215, 181, 109, 0.42);
		color: rgba(255, 255, 255, 0.84);
		box-shadow:
			inset 0 0 0 1px rgba(255, 255, 255, 0.16),
			0 0.6rem 1.4rem rgba(0, 0, 0, 0.16);
		filter: none;
		transform: none;
		white-space: normal;
		text-align: center;
		line-height: 1.25;
	}

	.home-hero__registration-message {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		max-width: 100%;
		margin: 0;
		padding: 0.75rem 1.15rem;
		border: 1px solid rgba(215, 181, 109, 0.45);
		border-radius: 999px;
		background: rgba(var(--home-dark-rgb), 0.42);
		color: rgba(255, 255, 255, 0.9);
		font-weight: 600;
		line-height: 1.25;
		text-align: center;
		white-space: normal;
	}

	/* =========================
	   HOME HERO - CONTADOR
	   ========================= */

	.home-hero__countdown {
		position: absolute;
		right: 2rem;
		bottom: 2rem;
		z-index: 5;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.15rem;
		width: 8.8rem;
		min-height: 8.8rem;
		padding: 1rem;
		border-radius: 1.2rem;
		background: rgba(var(--home-dark-rgb), 0.92);
		color: white;
		text-align: center;
		box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.22);
		backdrop-filter: blur(8px);
		overflow: visible;
	}

	.home-hero__countdown::before {
		content: '';
		position: absolute;
		inset: 0.55rem;
		border: 1px solid rgba(215, 181, 109, 0.65);
		border-radius: 0.9rem;
		pointer-events: none;
	}

	.home-hero__countdown::after {
		content: '✦';
		position: absolute;
		top: 0.55rem;
		left: 50%;
		z-index: 2;
		padding: 0 0.6rem;
		background: rgba(var(--home-dark-rgb), 0.92);
		color: var(--home-gold);
		font-size: 1rem;
		line-height: 1;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	.home-hero__countdown span,
	.home-hero__countdown strong {
		position: relative;
		z-index: 1;
		font-family: var(--bulma-family-primary, inherit);
	}

	.home-hero__countdown span {
		color: rgba(255, 255, 255, 0.86);
		font-size: 0.82rem;
	}

	.home-hero__countdown strong {
		color: var(--home-gold);
		font-size: 3rem;
		line-height: 1;
	}

	/* =========================
	   NOVEDADES
	   ========================= */

	.home-news {
		--home-gold: #d7b56d;
		--home-dark: var(--bulma-dark, #123f46);

		position: relative;
		z-index: 2;
		padding: 2rem 1.5rem 0;
		background: #f6f1e8;
	}

	.home-news__card {
		position: relative;
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 1rem;
		align-items: center;
		overflow: hidden;
		padding: 0.9rem 1rem;
		border: 1px solid rgba(215, 181, 109, 0.52);
		border-radius: 1.25rem;
		background:
			radial-gradient(circle at 10% 50%, rgba(215, 181, 109, 0.18), transparent 14rem),
			rgba(255, 255, 255, 0.82);
		box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.06);
		backdrop-filter: blur(8px);
	}

	.home-news__card::before {
		content: '';
		position: absolute;
		top: 0;
		right: 1.25rem;
		left: 1.25rem;
		height: 2px;
		background: linear-gradient(90deg, transparent, var(--home-gold), transparent);
		pointer-events: none;
	}

	.home-news__label {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.45rem;
		padding: 0.55rem 0.85rem;
		border-radius: 999px;
		background: var(--home-dark);
		color: var(--home-gold);
		font-family: var(--bulma-family-primary, inherit);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.home-news__marquee-wrapper {
		position: relative;
		overflow: hidden;
		min-width: 0;
		color: rgba(18, 63, 70, 0.88);
		font-size: 1rem;
		line-height: 1.45;
		background: transparent;

		-webkit-mask-image: linear-gradient(
			90deg,
			transparent 0,
			#000 1.25rem,
			#000 calc(100% - 6rem),
			transparent 100%
		);
		mask-image: linear-gradient(
			90deg,
			transparent 0,
			#000 1.25rem,
			#000 calc(100% - 6rem),
			transparent 100%
		);
	}

	.home-news__marquee {
		margin: 0;
	}

	.home-news__marquee > * {
		padding-right: 6rem;
	}

	/* =========================
	   LO QUE TE ESPERA
	   ========================= */

	.home-expectations {
		--home-gold: #d7b56d;

		position: relative;
		overflow: hidden;
		padding: 3.25rem 1.5rem 3.75rem;
		background:
			radial-gradient(circle at 10% 20%, rgba(215, 181, 109, 0.08), transparent 18rem),
			radial-gradient(circle at 90% 80%, rgba(7, 56, 64, 0.06), transparent 20rem), #f6f1e8;
	}

	.home-expectations::before {
		content: '';
		position: absolute;
		inset: 0;
		opacity: 0.22;
		pointer-events: none;
		background-image: radial-gradient(circle, rgba(7, 56, 64, 0.08) 1px, transparent 1px);
		background-size: 38px 38px;
	}

	.home-expectations .container {
		position: relative;
		z-index: 1;
	}

	.home-expectations__heading {
		margin-bottom: 2rem;
		text-align: center;
	}

	.home-expectations__heading .title {
		margin-bottom: 0;
		color: var(--bulma-dark, #123f46);
	}

	.home-expectations__heading::after {
		content: '';
		display: block;
		width: 5rem;
		height: 2px;
		margin: 0.9rem auto 0;
		border-radius: 999px;
		background: var(--home-gold);
	}

	.home-expectations__grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1.25rem;
	}

	.home-expectations__card {
		position: relative;
		overflow: hidden;
		min-height: 15rem;
		padding: 1.75rem 1.35rem;
		border: 1px solid rgba(7, 56, 64, 0.08);
		border-radius: 1.35rem;
		background: rgba(255, 255, 255, 0.74);
		box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.06);
		text-align: center;
		backdrop-filter: blur(8px);
		transition:
			transform 180ms ease,
			box-shadow 180ms ease,
			border-color 180ms ease;
	}

	.home-expectations__card::before {
		content: '';
		position: absolute;
		top: 0;
		right: 1.25rem;
		left: 1.25rem;
		height: 2px;
		background: linear-gradient(90deg, transparent, var(--home-gold), transparent);
		opacity: 0.8;
		pointer-events: none;
	}

	.home-expectations__card:hover {
		border-color: rgba(215, 181, 109, 0.45);
		transform: translateY(-4px);
		box-shadow: 0 1.25rem 2.4rem rgba(0, 0, 0, 0.09);
	}

	.home-expectations__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 4rem;
		height: 4rem;
		margin: 0 auto 1rem;
		border-radius: 999px;
		background: var(--bulma-dark, #123f46);
		color: var(--home-gold);
		font-size: 1.5rem;
		box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.12);
	}

	.home-expectations__icon svg {
		display: block;
		width: 2rem;
		height: 2rem;
	}

	.home-expectations__card h3 {
		margin: 0 0 0.75rem;
		color: var(--bulma-dark, #123f46);
		font-family: var(--bulma-family-primary, inherit);
		font-size: 1.25rem;
		line-height: 1.15;
	}

	.home-expectations__card p {
		margin: 0;
		color: rgba(18, 63, 70, 0.82);
		font-size: 0.92rem;
		line-height: 1.55;
	}

	/* =========================
	   CAROUSEL / SPEAKERS
	   ========================= */

	.carousel {
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		user-select: none;
	}

	.carousel::-webkit-scrollbar {
		display: none;
	}

	.carousel > * {
		scroll-snap-align: center;
	}

	.carousel-item {
		flex: none;
		width: 19em;
	}

	.carousel-item img {
		aspect-ratio: 3 / 4;
		object-fit: cover;
	}

	/* =========================
	   MARQUEE
	   ========================= */

	.marquee {
		position: relative;
		display: flex;
		overflow: hidden;
		user-select: none;
	}

	.marquee > * {
		flex-shrink: 0;
		padding-right: 1ch;
		animation: scroll 2s infinite linear;
		animation-play-state: paused;
	}

	@keyframes scroll {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(-100%);
		}
	}

	/* =========================
	   FEATURED TALKS
	   ========================= */

	.featured-talks {
		margin: 0;
	}

	.featured-talks > * {
		margin: -0.5px;
		border-width: 1px;
		border-style: solid;
	}

	.featured-talks-item {
		padding: 1.5rem;
	}

	/* =========================
	   RESPONSIVE - TABLET
	   ========================= */

	@media (min-width: 769px) {
		.featured-talks-item {
			padding: 5rem;
		}
	}

	@media (max-width: 1023px) {
		.home-hero__shell {
			min-height: 30rem;
		}

		.home-hero__content {
			max-width: 28rem;
			padding: 1.8rem 1.6rem 2rem;
		}

		.home-hero__countdown {
			right: 1.25rem;
			bottom: 1.25rem;
		}

		.home-expectations__grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	/* =========================
	   RESPONSIVE - MÓVIL
	   ========================= */

	@media (max-width: 768px) {
		.home-hero {
			overflow: visible;
		}

		.home-hero .hero-body {
			padding-top: 1rem;
		}

		.home-hero__shell {
			overflow: visible;
			min-height: 0;
			background: transparent;
			box-shadow: none;
		}

		.home-hero__shell::before,
		.home-hero__shell::after {
			display: none;
		}

		.home-hero__media {
			position: relative;
			inset: auto;
			z-index: 1;
			height: clamp(31rem, 118vw, 38rem);
			overflow: hidden;
			background: var(--home-dark);
			box-shadow: none;
		}

		.home-hero__media img {
			height: 100%;
			object-fit: cover;
		}

		.home-hero__image-credit {
			position: relative;
			top: auto;
			right: auto;
			bottom: auto;
			z-index: 5;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: fit-content;
			max-width: calc(100% - 2rem);
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

		.home-hero__overlay {
			position: absolute;
			inset: 0 0 auto;
			z-index: 2;
			height: clamp(31rem, 118vw, 38rem);
			background: linear-gradient(
				180deg,
				rgba(var(--home-dark-rgb), 0.88) 0%,
				rgba(var(--home-dark-rgb), 0.72) 38%,
				rgba(var(--home-dark-rgb), 0.52) 62%,
				rgba(var(--home-dark-rgb), 0.36) 100%
			);
			pointer-events: none;
		}

		.home-hero__content {
			position: absolute;
			inset: 0 0 auto;
			z-index: 4;
			max-width: none;
			padding: 1.5rem 1.25rem 1.5rem;
			color: white;
		}

		.home-hero__text,
		.home-hero__intro {
			max-width: none;
		}

		.home-hero__buttons {
			width: 100%;
			justify-content: center;
		}

		.home-hero__button-primary,
		.home-hero__button-primary--disabled,
		.home-hero__registration-message {
			width: auto;
			max-width: min(100%, 22rem);
			padding: 0.8rem 1rem;
			font-size: 0.98rem;
			line-height: 1.25;
			white-space: normal;
			text-align: center;
			overflow-wrap: anywhere;
			word-break: normal;
		}

		.home-hero__button-primary span {
			display: inline;
		}

		.home-hero__countdown {
			position: relative;
			right: auto;
			bottom: auto;
			z-index: 5;
			width: min(8rem, 72vw);
			min-height: 7.8rem;
			margin: 1rem auto 0;
			background: rgba(var(--home-dark-rgb), 0.94);
			box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
		}

		.home-hero__countdown strong {
			font-size: 2.4rem;
		}

		.home-news {
			padding: 1.5rem 1rem 0;
		}

		.home-news__card {
			grid-template-columns: 1fr;
			gap: 0.85rem;
			padding: 1rem;
			text-align: center;
		}

		.home-news__label {
			justify-self: center;
		}

		.home-news__marquee-wrapper {
			font-size: 0.95rem;

			-webkit-mask-image: linear-gradient(
				90deg,
				transparent 0,
				#000 0.9rem,
				#000 calc(100% - 3rem),
				transparent 100%
			);
			mask-image: linear-gradient(
				90deg,
				transparent 0,
				#000 0.9rem,
				#000 calc(100% - 3rem),
				transparent 100%
			);
		}

		.home-news__marquee > * {
			padding-right: 3rem;
		}

		.home-expectations {
			padding: 2.5rem 1rem 3rem;
		}

		.home-expectations__grid {
			grid-template-columns: 1fr;
		}

		.home-expectations__card {
			min-height: auto;
		}
	}
</style>
