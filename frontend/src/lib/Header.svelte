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

	type MenuItem = {
		label: string;
		href: string;
	};

	let { data } = $props();

	const username = data.username;
	const isLoggedIn = data.username !== undefined;

	const isRegistrationOpen = data.registration === REGISTRATION.OPEN;
	const isLoginEnabled = data.loginEnabled;

	const isRegistrationInfoActive = !isRegistrationOpen && data.registration !== REGISTRATION.HIDDEN;

	const hasCustomNavMenu = Array.isArray(data.nav_menu) && data.nav_menu.length > 0;

	const customMenuItems: MenuItem[] = hasCustomNavMenu
		? data.nav_menu
				.map((nav_menu_item) => ({
					label: nav_menu_item.label,
					href: nav_menu_item.page ? i18n.resolveRoute(nav_menu_item.page) : nav_menu_item.path
				}))
				.filter((item) => item.label && item.href)
		: [];

	const priorityMenuItems: MenuItem[] = [
		data.show_about_us
			? {
					label: m.about(),
					href: i18n.resolveRoute('/about-us')
				}
			: null,
		data.show_accommodation_info
			? {
					label: m.accommodation_info(),
					href: i18n.resolveRoute('/accommodation-info')
				}
			: null,
		isRegistrationInfoActive
			? {
					label: m.registration(),
					href: i18n.resolveRoute('/registration')
				}
			: null,
		data.show_prices
			? {
					label: m.prices(),
					href: i18n.resolveRoute('/price')
				}
			: null
	].filter(Boolean) as MenuItem[];

	const featuredMenuItems: MenuItem[] = [
		data.show_speakers
			? {
					label: m.speakers(),
					href: i18n.resolveRoute('/speakers')
				}
			: null
	].filter(Boolean) as MenuItem[];

	const secondaryMenuItems: MenuItem[] = [
		data.show_agenda
			? {
					label: m.agenda(),
					href: i18n.resolveRoute('/agenda')
				}
			: null,
		data.show_streaming
			? {
					label: m.streaming(),
					href: i18n.resolveRoute('/streaming')
				}
			: null,
		data.show_venue_info
			? {
					label: m.venue_info(),
					href: i18n.resolveRoute('/venue-info')
				}
			: null
	]
		.filter(Boolean)
		.sort((a, b) => a.label.localeCompare(b.label, 'es', { sensitivity: 'base' })) as MenuItem[];
	const menuItems: MenuItem[] = hasCustomNavMenu
		? customMenuItems
		: [...priorityMenuItems, ...featuredMenuItems, ...secondaryMenuItems];

	const hasHeaderCta = isRegistrationOpen && Boolean(data.register_cta);
	const shouldUseDesktopOverflow = hasHeaderCta ? menuItems.length >= 5 : menuItems.length >= 6;

	const desktopPrimaryMenuItems = shouldUseDesktopOverflow ? menuItems.slice(0, 4) : menuItems;
	const desktopOverflowMenuItems = shouldUseDesktopOverflow ? menuItems.slice(4) : [];

	const showMenu = menuItems.length > 0;

	let isNavbarHidden = $state(false);
	let isMenuActive = $state(false);
	let isDesktopMoreActive = $state(false);

	const logoRotation = `${Math.floor(Math.random() * 21) - 10}deg`;

	function toggleMenu() {
		isMenuActive = !isMenuActive;
		isDesktopMoreActive = false;

		if (isMenuActive) {
			isNavbarHidden = false;
		}
	}

	function toggleDesktopMore() {
		isDesktopMoreActive = !isDesktopMoreActive;
		isMenuActive = false;
		isNavbarHidden = false;
	}

	function closeMenu() {
		isMenuActive = false;
		isDesktopMoreActive = false;
	}

	const handleNavbarVisibility = ({ scrollMargin = 10, topSafeArea = 100 } = {}) => {
		let lastScrollPosition = window.scrollY;

		const handleScroll = () => {
			const currentScrollPosition = window.scrollY;
			const isSmallScreen = window.matchMedia('(max-width: 1023px)').matches;

			if (isSmallScreen || isMenuActive || isDesktopMoreActive) {
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
					<img
						alt={data.title}
						src="{storage_url}{data.logo_small.url}"
						style:--logo-rotation={logoRotation}
					/>
				{:else}
					<img alt={data.title} src={logoFallback} style:--logo-rotation={logoRotation} />
				{/if}

				<span class="brand-home-label">
					<span>Mereth</span>
					<span>Gaerlen</span>
				</span>
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
				<div class="navbar-start navbar-right navbar-items navbar-items--desktop">
					{#each desktopPrimaryMenuItems as menuItem}
						<a class="navbar-item" href={menuItem.href} onclick={closeMenu}>
							{menuItem.label}
						</a>
					{/each}

					{#if desktopOverflowMenuItems.length > 0}
						<div
							class="navbar-item has-dropdown desktop-more"
							class:is-active={isDesktopMoreActive}
						>
							<button
								class="navbar-link desktop-more__trigger"
								type="button"
								aria-label="Más secciones"
								aria-expanded={isDesktopMoreActive}
								onclick={toggleDesktopMore}
							>
								<span class="desktop-more__bars" aria-hidden="true">
									<span></span>
									<span></span>
									<span></span>
								</span>
							</button>

							<div class="navbar-dropdown is-right desktop-more__dropdown">
								{#each desktopOverflowMenuItems as menuItem}
									<a class="navbar-item" href={menuItem.href} onclick={closeMenu}>
										{menuItem.label}
									</a>
								{/each}
							</div>
						</div>
					{/if}
				</div>

				<div class="navbar-start navbar-right navbar-items navbar-items--mobile">
					{#each menuItems as menuItem}
						<a class="navbar-item" href={menuItem.href} onclick={closeMenu}>
							{menuItem.label}
						</a>
					{/each}
				</div>

				<div class="navbar-end">
					{#if isRegistrationOpen}
						<a
							href={i18n.resolveRoute('/registration')}
							class="button is-primary register-cta register-cta--menu"
							onclick={closeMenu}
						>
							{data.register_cta}
						</a>
					{:else if isLoginEnabled}
						{#if isLoggedIn}
							<a
								href={i18n.resolveRoute('/me')}
								class="button is-primary is-uppercase"
								title={username}
								onclick={closeMenu}
							>
								Mis datos
							</a>
						{:else}
							<a
								href={i18n.resolveRoute('/login')}
								class="button is-primary is-uppercase"
								onclick={closeMenu}
							>
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
		<a
			href={i18n.resolveRoute('/registration')}
			class="button is-primary register-cta register-cta--sticky"
		>
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

	.navbar-items--mobile {
		display: none;
	}

	.desktop-more {
		position: relative;
		flex: 0 0 auto;
	}

	.desktop-more__trigger {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.65rem;
		min-width: 2.65rem;
		height: 2.65rem;
		padding: 0;
		border: 0;
		border-radius: 999px;
		background: transparent;
		color: var(--bulma-primary, #0d3b44);
		cursor: pointer;
	}

	.desktop-more__trigger::after {
		display: none;
	}

	.desktop-more__trigger:hover,
	.desktop-more.is-active .desktop-more__trigger {
		background-color: #43b2dc;
		color: #ffffff;
	}

	.desktop-more__bars {
		display: grid;
		gap: 0.22rem;
		width: 1.1rem;
	}

	.desktop-more__bars span {
		display: block;
		width: 100%;
		height: 0.12rem;
		border-radius: 999px;
		background: currentColor;
	}

	.desktop-more__dropdown {
		min-width: 13rem;
		padding: 0.45rem 0;
		border-top: 0;
		border-radius: 0 0 0.5rem 0.5rem;
		background: rgba(255, 255, 255, 0.98);
		box-shadow: 0 0.9rem 2rem rgba(13, 59, 68, 0.16);
	}

	.desktop-more__dropdown .navbar-item {
		justify-content: flex-start;
		color: var(--bulma-primary, #0d3b44);
		text-align: left;
		white-space: nowrap;
	}

	@media screen and (min-width: 1024px) {
		:global(.navbar > .container) {
			display: flex;
			align-items: center;
			width: 100%;
			max-width: min(100%, 1380px);
			padding-right: clamp(1rem, 2.5vw, 2.5rem);
			padding-left: clamp(1rem, 2.5vw, 2.5rem);
		}

		:global(.navbar-brand) {
			flex: 0 0 auto;
			min-width: 0;
		}

		.register-cta.register-cta--sticky {
			display: none;
		}

		.register-cta.register-cta--menu {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			max-width: min(18rem, 22vw);
			min-width: 0;
			height: auto;
			min-height: 2.5rem;
			padding: 0.6rem 0.95rem;
			white-space: normal;
			text-align: center;
			line-height: 1.1;
		}

		.navbar-menu {
			display: flex;
			flex: 1 1 auto;
			align-items: center;
			justify-content: flex-end;
			width: auto;
			min-width: 0;
		}

		.navbar-items--desktop {
			display: flex;
			flex: 1 1 auto;
			align-items: center;
			justify-content: flex-end;
			width: auto;
			min-width: 0;
			padding-right: clamp(0.5rem, 1.4vw, 1.5rem);
			gap: 0.15rem;
		}

		.navbar-items--desktop :global(.navbar-item) {
			flex: 0 1 auto;
			min-width: 0;
			padding-right: clamp(0.65rem, 1vw, 1.2rem) !important;
			padding-left: clamp(0.65rem, 1vw, 1.2rem) !important;
		}

		.navbar-items--mobile {
			display: none;
		}

		.navbar-end {
			flex: 0 1 auto;
			min-width: 0;
			margin-left: 0.5rem;
			padding-right: 0;
		}

		.navbar-end :global(.button) {
			max-width: min(18rem, 22vw);
			white-space: normal;
			text-align: center;
			line-height: 1.1;
		}

		.desktop-more .navbar-dropdown {
			display: none;
		}

		.desktop-more.is-active .navbar-dropdown {
			display: block;
		}
	}

	@media screen and (min-width: 1024px) and (max-width: 1199px) {
		.register-cta.register-cta--menu,
		.navbar-end :global(.button) {
			max-width: 9.5rem;
			font-size: 0.82rem;
		}

		.navbar-items--desktop {
			padding-right: 0.5rem;
		}

		.navbar-items--desktop :global(.navbar-item) {
			padding-right: 0.55rem !important;
			padding-left: 0.55rem !important;
			font-size: 0.86rem;
		}
	}

	@media screen and (max-width: 1023px) {
		.navbar.is-concealed {
			transform: none;
			opacity: 1;
			pointer-events: auto;
		}

		.navbar-items--desktop {
			display: none;
		}

		.navbar-items--mobile {
			display: block;
		}

		.navbar-menu.is-active {
			display: block;
		}
	}
</style>
