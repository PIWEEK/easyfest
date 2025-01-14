<script lang="ts">
    import { onMount } from 'svelte';
    import * as m from '$lib/paraglide/messages.js'
    import { i18n } from '$lib/i18n.js'

    import logoFallback from '../assets/images/easyfest-logo.svg'

    const REGISTRATION = {
        HIDDEN: 'hidden',
        SOON: 'soon',
        OPEN: 'open',
        FINISHED: 'finished',
    }

    const storage_url = import.meta.env.VITE_STORAGE_URL
    let { data } = $props();

    const isRegistrationOpen = data.registration === REGISTRATION.OPEN

    const isRegistrationInfoActive = !isRegistrationOpen && data.registration !== REGISTRATION.HIDDEN
    const showMenu = data.show_about_us ||
        isRegistrationInfoActive ||
        data.show_accommodation_info ||
        data.show_agenda ||
        data.show_speakers ||
        data.show_streaming ||
        data.show_venue_info

    let navbarHiddenClass = '';
    let isNavbarHidden = $state(false);

    function hamburgerClick(event) {
        const hamburger = event.currentTarget;
        const menuId = hamburger.dataset.menuId;
        const menu = document.getElementById(menuId);
        if (menu) {
            hamburger.classList.toggle("is-active");
            menu.classList.toggle("is-active");
        }
    }

    const handleNavbarVisibility = ({scrollMargin = 10, topSafeArea = 100} = {}) => {
        let lastScrollPosition = window.scrollY;

        window.addEventListener('scroll',() => {
        const currentScrollPosition = window.scrollY;

        if (currentScrollPosition>lastScrollPosition + scrollMargin) {
            isNavbarHidden = true;
        } else if (currentScrollPosition<lastScrollPosition - scrollMargin) {
            isNavbarHidden = false;
        }

        if (currentScrollPosition < topSafeArea) navbarHiddenClass='';
        lastScrollPosition = currentScrollPosition;
    });
    }

    onMount(() => {
        handleNavbarVisibility();
    });
</script>

<style>
    .navbar {
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        transition: transform 0.1s ease-in-out;
    }

    .is-concealed {
        transform: translateY(-100%);
    }

    .navbar-center {
        width: 100%;
        justify-content: center;
    }

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
</style>
<nav class="navbar is-spaced" class:is-concealed={isNavbarHidden} aria-label="main-navigation">
     <div class="container">
        <div class="navbar-brand">
            <a href="/" class="navbar-item">
                {#if data.logo_small}
                <img alt={data.title} src="{storage_url}{data.logo_small.url}"/>
                {:else}
                <img alt={data.title} src={logoFallback}/>
                {/if}
            </a>
            {#if showMenu}
            <button class="navbar-burger" aria-label="menu" aria-expanded="false" data-menu-id="mainMenu"
               onclick={hamburgerClick}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </button>
            {/if}
        </div>
        {#if showMenu}
        <div id="mainMenu" class="navbar-menu">
            {#if data.nav_menu.length === 0}
                <div class="navbar-start navbar-center">
                    {#if data.show_about_us}
                    <a class="navbar-item" href="/about-us">{m.about()}</a>
                    {/if}
                    {#if isRegistrationInfoActive}
                    <a class="navbar-item" href="/registration">{m.registration()}</a>
                    {/if}
                    {#if data.show_accommodation_info}
                    <a class="navbar-item" href="/accommodation-info">{m.accommodation_info()}</a>
                    {/if}
                    {#if data.show_agenda}
                    <a class="navbar-item" href="/agenda">{m.agenda()}</a>
                    {/if}
                    {#if data.show_speakers}
                    <a class="navbar-item" href="/speakers">{m.speakers()}</a>
                    {/if}
                    {#if data.show_streaming}
                    <a class="navbar-item" href="/streaming">{m.streaming()}</a>
                    {/if}
                    {#if data.show_venue_info}
                    <a class="navbar-item" href="/venue-info">{m.venue_info()}</a>
                    {/if}
                </div>
                <div class="navbar-end">
                    {#if isRegistrationOpen}
                    <a href="/registration" class="button is-primary register-cta register-cta--menu">{data.register_cta}</a>
                    {/if}
                </div>
            {:else}
                <div class="navbar-start navbar-center">
                    {#each data.nav_menu as nav_menu_item}
                        {#if nav_menu_item.page}
                            <a class="navbar-item" href="{i18n.resolveRoute(nav_menu_item.page)}">{nav_menu_item.label}</a>
                        {:else}
                            <a class="navbar-item" href="{nav_menu_item.path}">{nav_menu_item.label}</a>
                        {/if}
                    {/each}
                </div>
            {/if}
        </div>
        {/if}
    </div>
</nav>
{#if isRegistrationOpen}
<div><a href="/registration" class="button is-primary register-cta register-cta--sticky">{data.register_cta}</a></div>
{/if}
