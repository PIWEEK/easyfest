<script>
    import { onMount } from 'svelte';
    const storage_url = import.meta.env.VITE_STORAGE_URL
    export let data;
    export let navbarHiddenClass = '';
  
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
            navbarHiddenClass='is-concealed';
        } else if (currentScrollPosition<lastScrollPosition - scrollMargin) {
            navbarHiddenClass=''; 
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

<nav class="navbar is-dark is-spaced {navbarHiddenClass} " aria-label="main-navigation">
     <div class="container">
        <div class="navbar-brand">
            {#if data.logo_horiz.data}
            <a href="/" class="navbar-item"><img alt="Logo" src="{storage_url}{data.logo_horiz.data.attributes.url}"/></a>
            {/if}
            <button class="navbar-burger" aria-label="menu" aria-expanded="false" data-menu-id="mainMenu"
               on:click={hamburgerClick}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </button>
        </div>
        <div id="mainMenu" class="navbar-menu">
            <div class="navbar-start navbar-center">
                <a class="navbar-item" href="/about-us">About</a>
                {#if data.registration != "hidden"}
                <a class="navbar-item" href="/registration">Registration</a>
                {/if}
                <a class="navbar-item" href="/accommodation-info">Accomodation info</a>
                <a class="navbar-item" href="/agenda">Agenda</a>
                <a class="navbar-item" href="/speakers">Speakers</a>
                <a class="navbar-item" href="/streaming">Streaming</a>
                <a class="navbar-item" href="/venue-info">Venue info</a>
           </div>
            <div class="navbar-end">
            </div>
        </div>
    </div>
</nav>
