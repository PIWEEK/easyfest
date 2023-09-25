<script>
    import { onMount } from 'svelte';

    import logoFallback from '../assets/images/easyfest-logo.svg'

    const storage_url = import.meta.env.VITE_STORAGE_URL
    export let data;

    const isRegistrationActive = data.registration != "hidden"
    const showMenu = data.show_about_us ||
        isRegistrationActive ||
        data.show_accommodation_info ||
        data.show_agenda ||
        data.show_speakers ||
        data.show_streaming ||
        data.show_venue_info

    let navbarHiddenClass = '';
    let isNavbarHidden = false;

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
</style>

<nav class="navbar is-dark is-spaced" class:is-concealed={isNavbarHidden} aria-label="main-navigation">
     <div class="container">
        <div class="navbar-brand">
            <a href="/" class="navbar-item">
                {#if data.logo_horiz.data}
                <img alt={data.title} src="{storage_url}{data.logo_horiz.data.attributes.url}"/>
                {:else}
                <img alt={data.title} src={logoFallback}/>
                {/if}
            </a>
            {#if showMenu}
            <button class="navbar-burger" aria-label="menu" aria-expanded="false" data-menu-id="mainMenu"
               on:click={hamburgerClick}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </button>
            {/if}
        </div>
        {#if showMenu}
        <div id="mainMenu" class="navbar-menu">
            <div class="navbar-start navbar-center">
                {#if data.show_about_us}
                <a class="navbar-item" href="/about-us">About</a>
                {/if}
                {#if isRegistrationActive}
                <a class="navbar-item" href="/registration">Registration</a>
                {/if}
                {#if data.show_accommodation_info}
                <a class="navbar-item" href="/accommodation-info">Accomodation info</a>
                {/if}
                {#if data.show_agenda}
                <a class="navbar-item" href="/agenda">Agenda</a>
                {/if}
                {#if data.show_speakers}
                <a class="navbar-item" href="/speakers">Speakers</a>
                {/if}
                {#if data.show_streaming}
                <a class="navbar-item" href="/streaming">Streaming</a>
                {/if}
                {#if data.show_venue_info}
                <a class="navbar-item" href="/venue-info">Venue info</a>
                {/if}
           </div>
            <div class="navbar-end">
            </div>
        </div>
        {/if}
    </div>
</nav>
