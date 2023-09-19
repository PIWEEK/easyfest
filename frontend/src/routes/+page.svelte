<script>
import { onMount } from 'svelte';
    const storage_url = import.meta.env.VITE_STORAGE_URL
    /** @type {import('./$types').PageData} */
    export let data;

    onMount(() => {
        const carousel = document.querySelector('.carousel');
        const carouselItems = carousel.querySelectorAll('.carousel-item');

        let isDragging = false;
        let startPosX = 0;
        let scrollLeft = 0;

        carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startPosX = e.clientX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const mouseX = e.clientX - carousel.offsetLeft;
        const deltaX = mouseX - startPosX;
        carousel.scrollLeft = scrollLeft - deltaX;
        });

        carousel.addEventListener('mouseup', () => {
        isDragging = false;
        });

        carousel.addEventListener('mouseleave', () => {
        isDragging = false;
        });

        const carouselItemWidth = carouselItems[0].getBoundingClientRect().width;
        const scrollLeftButton = document.querySelector('#carousel-btn-left');
        const scrollRightButton = document.querySelector('#carousel-btn-right');

        scrollLeftButton.addEventListener('click', () => {
        carousel.scrollLeft -= carouselItemWidth * 1; // Ajusta la cantidad de desplazamiento según sea necesario
        });

        scrollRightButton.addEventListener('click', () => {
        carousel.scrollLeft += carouselItemWidth * 1; // Ajusta la cantidad de desplazamiento según sea necesario
        });
	});



</script>

<section class="hero is-medium has-background-dark has-text-white">
    <div class="hero-body">
        <div class="container">
            <div class="columns">
                <div class="column is-two-thirds">
                    <p class="has-text-info-light header-date">June 28-30, Barcelona</p>
                    <p class="title header--large has-text-white">EasyFest,<br/>Building Freedom for Design</p>
                    <p class="subtitle text--large has-text-white">Easy Fest is the Design event that brought designers and developers together in Barcelona in June 28-30. We had an amazing time. See you next year!</p>
                    <a href="/register" class="button is-primary">Register now!</a>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section">
    <div class="container pb-6">
        <div class="level columns">
            <div class="column">
                <p class="title header--medium">48 hours packed with</p>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="level columns">

            <div class="column">
                <figure class="image is-5by4">
                    <img src="https://bulma.io/images/placeholders/600x480.png" alt="Placeholder"/>
                </figure>
            </div>
            <div class="column content">
                <p>- An evening Welcome Party at Modernista Casa de les Punxes rooftop!</p>
                <p>- An exceptional line-up of speakers from all around the world!</p>
                <p>- A XVI century Gothic Convent with its Renaissance chapel as our main venue!</p>
                <p>- Penpot workshops to get from zero to hero as a user or contributor!</p>
                <p>- Extended coffee breaks and chill-out time to get to meet amazing people!</p>
                <p>- A memorable sunset dinner cruise on Thursday to enjoy Barcelona from the sea!</p>
            </div>
        </div>
    </div>
</section>

<aside class="has-background-primary-light">
    <div class="level is-mobile text--small--uppercase py-4">
        {#each Array(16) as _}
        <div class="level-item">Registration is open</div>
        <div class="level-item">🔥</div>
        {/each}
    </div>
</aside>

<section class="has-background-dark has-text-white">
    <div class="container p-6">
        <div class="level columns">
            <div class="column">
                <p class="title header--medium has-text-white">Featured talks</p>
            </div>
            <div class="column">
                <div class="is-pulled-right">
                    <a href="/agenda" class="button is-white is-outlined">View full agenda</a>
                </div>
            </div>
        </div>
    </div>
    <div class="columns is-multiline is-gapless">
        {#each Array(4) as _, i}
        <div class="column is-half">
            <div class="p-6" style="height: 100%; display: flex; flex-direction: column">
                <p class="block">28 Wed. 10:00 am</p>
                <div class="block">
                    <span class="tag is-info has-text-dark text--small--uppercase">Podcast</span>
                </div>
                <p class="title header--small is-spaced has-text-white">Sustain open source podcast</p>
                {#if i % 2 === 0}
                <p class="subtitle text--medium has-text-white">There will be recording sessions for on-demand interviews on Thursday and Friday.</p>
                {/if}
                <div class="block text--small" style="flex-grow: 1">
                    <p><span style="text-decoration: underline">Jan Six</span>, Creator of Tokens Studio, Staff Product Designer at Github</p>
                    <p><span style="text-decoration: underline">Marco-Christian Krenn</span>, Freelance Design System Architect</p>
                    {#if i % 3 === 0}
                    <p><span style="text-decoration: underline">Eriol Fox</span>, Senior Designer at Superbloom & PhD Researcher at Newcastle University</p>
                    {/if}
                </div>
                <div class="block">
                    <p>Casa de les Punxes - Av. Diagonal, 420</p>
                </div>
            </div>
        </div>
        {/each}
    </div>
</section>

<section class="has-background-info-light">
    <div class="container p-6">
        <div class="level columns">
            <div class="column">
                <p class="title header--medium">Speakers</p>
            </div>
            <div class="column">
                <div class="is-pulled-right">
                    <button id="carousel-btn-left" class="button is-ghost has-text-dark">&larr;</button>
                    <button id="carousel-btn-right" class="button is-ghost has-text-dark">&rarr;</button>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="carousel is-flex flex-wrap-nowrap py-1" style="margin: 0 auto">
            {#each Array(10) as _, i}
            <div class="ml-4 carousel-item" style="flex: none; width: 16em">
                <div style="position: relative">
                    <figure class="image is-2by3">
                        <img src="https://bulma.io/images/placeholders/320x480.png" alt="Placeholder">
                    </figure>
                    {#if i % 3 === 0}
                    <span class="tag is-dark text--small--uppercase" style="position: absolute; right: 4px; bottom: 8px">Special guest</span>
                    {/if}
                </div>
                <div class="card-content">
                    <p class="title header--small is-spaced">Clara García</p>
                    <div class="block">
                        <p>Product Designer at Penpot</p>
                    </div>
                </div>
            </div>
            {/each}
        </div>
    </div>
    <div class="level buttons p-6 is-centered">
        <a href="/agenda" class="button is-dark is-outlined">View all speakers</a>
    </div>
</section>

<section class="block has-background-white">
    <div class="container p-6">
        <div>
            <p class="title header--medium">Locations</p>
            <p class="subtitle text--large">You'll enjoy the best of backdrops, everything's included</p>
        </div>
    </div>
    <div class="container">
        {#each Array(3) as _, i}
        <div class="level columns" class:is-flex-direction-row-reverse="{i % 2 === 1}">
            <div class="column is-half p-0">
                <figure class="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/640x480.png" alt="Placeholder"/>
                </figure>
            </div>
            <div class="column is-half content p-6">
                <h1>La Casa de Les Punxes</h1>
                <p><em>Welcome party</em></p>
                <p>Designed by the modernist architect Josep Puig i Cadafalch, in the very heart of Barcelona, this building is one of the most emblematic in the city.</p>
                <p>Its terrace will host Penpot Fest’s warmest welcome, amazing food and live music!</p>
            </div>
        </div>
        {/each}
    </div>
</section>

<section class="block">
    <div class="container p-6">
        <div>
            <p class="title header--medium">Acommodation</p>
            <p class="subtitle text--large">Stay close to the action with these exclusive Penpot Fest discounts!</p>
        </div>
    </div>
    <div class="container">
        <div class="level columns is-multiline is-justify-content-center is-align-items-stretch">
            {#each Array(5) as _, i}
            <div class="column is-one-third">
                <figure class="image is-16by9">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder">
                </figure>
                <div class="p-3">
                    <h1 class="title header--small">Catalonia Hotels</h1>
                    <div class="content">
                        <p>Enjoy a 10% discount on all Catalonia hotels for you.{#if i % 3 === 1}<br/>Use this link{/if}</p>
                        <p><em>Booking subjected to availability</em></p>
                    </div>
                </div>
            </div>
            {/each}
        </div>
    </div>
</section>

<style>
    img {
        width: 100%;
    }

    .carousel {
        overflow-x: scroll;
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
</style>
