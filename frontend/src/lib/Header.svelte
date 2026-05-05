<script lang="ts">
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages.js';
	import { i18n } from '$lib/i18n.js';

	import logoFallback from '../assets/images/easyfest_logo.png';

	const storage_url = import.meta.env.VITE_STORAGE_URL;

	const REGISTRATION = {
		HIDDEN: 'hidden',
		SOON: 'soon',
		OPEN: 'open',
		FINISHED: 'finished'
	};

	let { data } = $props();

	const username = data.username;
	const isLoggedIn = data.username !== undefined;

	const isRegistrationOpen = data.registration === REGISTRATION.OPEN;
	const isLoginEnabled = data.loginEnabled;

	const isRegistrationInfoActive = !isRegistrationOpen && data.registration !== REGISTRATION.HIDDEN;

	const showMenu =
		data.show_about_us ||
		isRegistrationInfoActive ||
		data.show_accommodation_info ||
		data.show_agenda ||
		data.show_speakers ||
		data.show_streaming ||
		data.show_venue_info ||
		data.show_prices;

	let isNavbarHidden = $state(false);
	let isMenuActive = $state(false);

	function toggleMenu() {
		isMenuActive = !isMenuActive;

		if (isMenuActive) {
			isNavbarHidden = false;
		}
	}

	function closeMenu() {
		isMenuActive = false;
	}

	const handleNavbarVisibility = ({ scrollMargin = 10, topSafeArea = 100 } = {}) => {
		let lastScrollPosition = window.scrollY;

		const handleScroll = () => {
			const currentScrollPosition = window.scrollY;
			const isSmallScreen = window.matchMedia('(max-width: 1023px)').matches;

			if (isSmallScreen || isMenuActive) {
				isNavbarHidden = false;
				lastScrollPosition = currentScrollPosition;
				return;
			}

			if (currentScrollPosition < topSafeArea) {
				isNavbarHidden = false;
				lastScrollPosition = currentScrollPosition;
				return;
			}

			if (currentScrollPosition > lastScrollPosition + scrollMargin) {
				isNavbarHidden = true;
			} else if (currentScrollPosition < lastScrollPosition - scrollMargin) {
				isNavbarHidden = false;
			}

			lastScrollPosition = currentScrollPosition;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	};

	onMount(() => {
		const cleanupNavbarVisibility = handleNavbarVisibility();

		return () => {
			cleanupNavbarVisibility?.();
		};
	});
</script>

<nav class="navbar" class:is-concealed={isNavbarHidden} aria-label="main-navigation">
	<div class="container">
		<div class="navbar-brand">
			<a href="/" class="navbar-item brand" onclick={closeMenu}>
				{#if data.logo_small}
					<img alt={data.title} src="{storage_url}{data.logo_small.url}" />
				{:else}
					<img alt={data.title} src={logoFallback} />
				{/if}

				<span class="brand-home-label">Mereth Gaerlen</span>
			</a>

			{#if showMenu}
				<button
					class="navbar-burger"
					class:is-active={isMenuActive}
					aria-label="menu"
					aria-expanded={isMenuActive}
					aria-controls="mainMenu"
					onclick={toggleMenu}
				>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</button>
			{/if}
		</div>

		{#if showMenu}
			<div id="mainMenu" class="navbar-menu" class:is-active={isMenuActive}>
				{#if data.nav_menu?.length === 0}
					<div class="navbar-start navbar-right">
						{#if data.show_about_us}
							<a class="navbar-item" href="/about-us" onclick={closeMenu}>{m.about()}</a>
						{/if}

						{#if isRegistrationInfoActive}
							<a class="navbar-item" href="/registration" onclick={closeMenu}>
								{m.registration()}
							</a>
						{/if}

						{#if data.show_accommodation_info}
							<a class="navbar-item" href="/accommodation-info" onclick={closeMenu}>
								{m.accommodation_info()}
							</a>
						{/if}

						{#if data.show_agenda}
							<a class="navbar-item" href="/agenda" onclick={closeMenu}>{m.agenda()}</a>
						{/if}

						{#if data.show_speakers}
							<a class="navbar-item" href="/speakers" onclick={closeMenu}>{m.speakers()}</a>
						{/if}

						{#if data.show_streaming}
							<a class="navbar-item" href="/streaming" onclick={closeMenu}>{m.streaming()}</a>
						{/if}

						{#if data.show_venue_info}
							<a class="navbar-item" href="/venue-info" onclick={closeMenu}>
								{m.venue_info()}
							</a>
						{/if}

						{#if data.show_prices}
							<a class="navbar-item" href="/price" onclick={closeMenu}>{m.prices()}</a>
						{/if}
					</div>
				{:else}
					<div class="navbar-start navbar-right">
						{#each data.nav_menu as nav_menu_item}
							{#if nav_menu_item.page}
								<a
									class="navbar-item"
									href={i18n.resolveRoute(nav_menu_item.page)}
									onclick={closeMenu}
								>
									{nav_menu_item.label}
								</a>
							{:else}
								<a class="navbar-item" href={nav_menu_item.path} onclick={closeMenu}>
									{nav_menu_item.label}
								</a>
							{/if}
						{/each}
					</div>
				{/if}

				<div class="navbar-end">
					{#if isRegistrationOpen}
						<a
							href="/registration"
							class="button is-primary register-cta register-cta--menu"
							onclick={closeMenu}
						>
							{data.register_cta}
						</a>
					{:else if isLoginEnabled}
						{#if isLoggedIn}
							<a
								href="/me"
								class="button is-primary is-uppercase"
								title={username}
								onclick={closeMenu}
							>
								Mis datos
							</a>
						{:else}
							<a href="/login" class="button is-primary is-uppercase" onclick={closeMenu}>
								{m.login()}
							</a>
						{/if}
					{/if}
				</div>
			</div>
		{/if}
	</div>
</nav>

{#if isRegistrationOpen}
	<div>
		<a href="/registration" class="button is-primary register-cta register-cta--sticky">
			{data.register_cta}
		</a>
	</div>
{/if}

<style>
	.register-cta.register-cta--sticky {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 100;
		border-radius: 0;
		height: 48px;
	}

	.register-cta.register-cta--menu {
		display: none;
	}

	@media screen and (min-width: 1024px) {
		.register-cta.register-cta--sticky {
			display: none;
		}

		.register-cta.register-cta--menu {
			display: unset;
		}
	}

	@media screen and (max-width: 1023px) {
		.navbar.is-concealed {
			transform: none;
			opacity: 1;
			pointer-events: auto;
		}
	}
</style>
