<script>
    import { onMount } from 'svelte'
    import SvelteMarkdown from 'svelte-markdown'

    import heroFallback from '../assets/images/easyfest-illustration.png'
    import Marquee from '../lib/Marquee'

    const storage_url = import.meta.env.VITE_STORAGE_URL
    /** @type {import('./$types').PageData} */
    export let data;

    /** @type {DateTimeFormatOptions} */
    const activityDateFormatOptions = {
        dateStyle: 'medium',
        timeStyle: 'short',
    }

    /** @type {HTMLDivElement} */
    let /* binded */ marqueeElement;
    onMount(() => {
        if (!marqueeElement) return;

        new Marquee(marqueeElement, 50);
    });

    /** @type {HTMLDivElement} */
    let /* binded */ carousel;
    /** @type {HTMLButtonElement} */
    let /* binded */ scrollLeftButton;
    /** @type {HTMLButtonElement} */
    let /* binded */ scrollRightButton;
    onMount(() => {
        if (!carousel) return;
        if (!scrollLeftButton) return;
        if (!scrollRightButton) return;

        const carouselItems = carousel.querySelectorAll('.carousel-item');

        let isDragging = false;
        let startPosX = 0;
        let scrollLeft = 0;

        const carouselItemWidth = carouselItems[0].getBoundingClientRect().width;

        let scrollItemNumber = 1
        if (window.innerWidth > 768) scrollItemNumber = 3

        const eventHandlers = [
            {
                target: carousel,
                eventName: 'mousedown',
                listener: (e) => {
                    isDragging = true;
                    startPosX = e.clientX - carousel.offsetLeft;
                    scrollLeft = carousel.scrollLeft;
                },
            },
            {
                target: carousel,
                eventName: 'mousemove',
                listener: (e) => {
                    if (!isDragging) return;
                    const mouseX = e.clientX - carousel.offsetLeft;
                    const deltaX = mouseX - startPosX;
                    carousel.scrollLeft = scrollLeft - deltaX;
                },
            },
            {
                target: carousel,
                eventName: 'mouseup',
                listener: () => {
                    isDragging = false;
                },
            },
            {
                target: carousel,
                eventName: 'mouseleave',
                listener: () => {
                    isDragging = false;
                },
            },
            {
                target: scrollLeftButton,
                eventName: 'click',
                listener: () => {
                    carousel.scrollLeft -= carouselItemWidth * scrollItemNumber;
                },
            },
            {
                target: scrollRightButton,
                eventName: 'click',
                listener: () => {
                    carousel.scrollLeft += carouselItemWidth * scrollItemNumber;
                },
            },
        ];

        for (const { target, eventName, listener } of eventHandlers) {
            target.addEventListener(eventName, listener);
        }

        return () => {
            for (const { target, eventName, listener } of eventHandlers) {
                target.removeEventListener(eventName, listener);
            }
        }
	});

    const STATUS = {
        HYPE: 'hype',
        PUBLIC: 'public',
        FINISHED: 'finished',
    }

    const { homepage, speakers, ...settings } = data
    const highlightText = {
        [STATUS.HYPE]: homepage.highlight_hype,
        [STATUS.PUBLIC]: homepage.highlight_public,
        [STATUS.FINISHED]: homepage.highlight_finished,
    }[settings.status] ?? null
</script>

<section class="hero is-medium has-background-dark has-text-white">
    <div class=" ">
        <div class=" ">
            <div class="columns is-gapless">
                <div class="hero-content column  is-two-thirds">
                    {#if homepage.dates_and_location}
                    <p class="has-text-secondary-light header-date">{homepage.dates_and_location}</p>
                    {/if}
                    <p class="title header--large has-text-white">{homepage.title}</p>
                    {#if highlightText}
                    <p class="subtitle text--large has-text-white">{highlightText}</p>
                    {/if}
                </div>
                <div class="column is-one-third">
                    <figure class="hero-image image">
                        {#if homepage.hero_image.data}
                        {@const image = homepage.hero_image.data.attributes}
                        <img src="{storage_url}{image.url}" alt={image.caption}/>
                        {:else}
                        <img src={heroFallback} alt=""/>
                        {/if}
                    </figure>
                </div>
            </div>
        </div>
    </div>
</section>

{#if homepage.about_section}
{@const title = homepage.about_section.title}
{@const image = homepage.about_section.image.data.attributes}
{@const mdContent = homepage.about_section.content}
<section class="section">
    <div class="container pb-6">
        <div class="level columns">
            <div class="column">
                <p class="title header--medium">{title}</p>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="level columns">

            <div class="column">
                <figure class="image is-5by4">
                    <img src="{storage_url}{image.url}" alt={image.caption}/>
                </figure>
            </div>
            <div class="column content">
                <SvelteMarkdown options={{mangle: false}} source={mdContent} />
            </div>
        </div>
    </div>
</section>
{/if}

{#if homepage.show_marquee_text && homepage.marquee_text}
<aside class="has-background-primary-light">
    <div bind:this={marqueeElement} class="marquee level is-mobile text--small--uppercase py-4">
        <div>{homepage.marquee_text}</div>
    </div>
</aside>
{/if}

{#if settings.show_agenda && homepage.activities_section}
{@const activities = homepage.activities_section}
{@const featuredActivities = activities.featured_activities.data}
{#if featuredActivities.length > 0}
<section class="has-background-dark has-text-white">
    <div class="container p-6">
        <div class="level columns">
            <div class="column">
                <p class="title header--medium has-text-white">{activities.title}</p>
                {#if activities.intro}
                <p class="subtitle text--large has-text-white">{activities.intro}</p>
                {/if}
            </div>
            <div class="column">
                <div class="is-pulled-right">
                    <a href="/agenda" class="button is-white is-outlined">{activities.agenda_link_text}</a>
                </div>
            </div>
        </div>
    </div>
    <div class="columns is-multiline featured-talks">
        {#each featuredActivities as activityWrapper, i}
        {@const activity = activityWrapper.attributes}
        <div class="column is-half border-color--secondary has-background-dark">
            <div class="featured-talks-item" style="height: 100%; display: flex; flex-direction: column">
                {#if activity.start}
                {@const datetime = new Date(activity.start)}
                <p class="block has-text-white-ter">{datetime.toLocaleString(undefined, activityDateFormatOptions)}</p>
                {/if}
                <div class="block">
                    {#if activity.tag2}
                    <span class="tag has-background-secondary-light has-text-dark text--small--uppercase">{activity.tag2}</span>
                    {/if}
                </div>
                <p class="title header--small is-spaced has-text-white">{activity.title}</p>
                {#if activity.short_description}
                <p class="subtitle text--medium has-text-white">{activity.short_description}</p>
                {/if}
                <div class="block text--small" style="flex-grow: 1">
                    {#each activity.public_faces.data as profileWrapper}
                    {@const profile = profileWrapper.attributes}
                    <p><span style="text-decoration: underline">{profile.fullname}</span>, {profile.title}</p>
                    {/each}
                </div>
                {#if activity.track}
                {@const track = activity.track.data.attributes}
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
{@const speakers = homepage.speakers_section}
<section class="has-background-secondary-lighter">
    <div class="container p-6">
        <div class="level columns">
            <div class="column">
                <p class="title header--medium">{speakers.title}</p>
            </div>
            <div class="column">
                <div class="is-pulled-right">
                    <button bind:this={scrollLeftButton} class="button is-ghost has-text-dark">&larr;</button>
                    <button bind:this={scrollRightButton} class="button is-ghost has-text-dark">&rarr;</button>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div bind:this={carousel} class="carousel is-flex flex-wrap-nowrap py-1" style="margin: 0 auto">
            {#each speakers as profile}
            {@const picture = profile.photo.data.attributes}
            <article class="ml-4 carousel-item">
                <div style="position: relative">
                    <figure class="image">
                        <img src={picture.url} alt={picture.caption ?? profile.fullname}>
                    </figure>
                    {#if profile.is_guest}
                    <span class="tag is-dark text--small--uppercase" style="position: absolute; right: 4px; bottom: 8px">Special guest</span>
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
        <a href="/speakers" class="button is-dark is-outlined">{speakers.speakers_link_text}</a>
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
        {@const image = location.image.data.attributes}
        {@const badge = location.badge}
        {@const title = location.title}
        {@const mdContent = location.content}
        <div class="level columns" class:is-flex-direction-row-reverse="{!isEven}">
            <div class="column is-half p-0">
                <figure class="image is-4by3">
                    <img src="{storage_url}{image.url}" alt={image.caption}/>
                </figure>
            </div>
            <div class="column is-half content p-6">
                <p><em>{badge}</em></p>
                <h1>{title}</h1>
                <SvelteMarkdown options={{mangle: false}} source={mdContent} />
            </div>
        </div>
        {/each}
    </div>
</section>
{/if}

{#if settings.show_accommodation_info && homepage.accommodation_section}
{@const accommodation = homepage.accommodation_section}
<section class="block has-background-white-bis">
    <div class="container p-6">
        <div>
            <p class="title header--medium">{accommodation.title}</p>
            {#if accommodation.intro}
            <p class="subtitle text--large">{accommodation.intro}</p>
            {/if}
        </div>
    </div>
    <div class="container">
        <div class="level columns is-multiline is-justify-content-center is-align-items-stretch">
            {#each accommodation.places as place}
            {@const image = place.image.data.attributes}
            {@const title = place.title}
            {@const mdContent = place.content}
            <div class="column is-one-third">
                <figure class="image is-16by9">
                    <img src="{storage_url}{image.url}" alt={image.caption}>
                </figure>
                <div class="py-3">
                    <h1 class="title header--small">{title}</h1>
                    <div class="content">
                        <SvelteMarkdown options={{mangle: false}} source={mdContent} />
                    </div>
                </div>
            </div>
            {/each}
        </div>
    </div>
</section>
{/if}

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

    .carousel-item {
        flex: none;
        width: 19em;
    }

    .carousel-item img {
        aspect-ratio: 3 / 4;
        object-fit: cover;
    }

    .marquee {
        display: flex;
        overflow: hidden;
        user-select: none;
        position: relative;
    }

    .marquee > * {
        flex-shrink: 0;
        animation: scroll 2s infinite linear;
        animation-play-state: paused;
        padding-right: 1ch;
    }

    @keyframes scroll {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-100%);
        }
    }

    .featured-talks {
        margin: 0;
    }

    .featured-talks > * {
        border-width: 1px;
        border-style: solid;
        margin: -0.5px;
    }

    .featured-talks-item {
        padding: 1.5rem;
    }

    @media (min-width: 769px) {
        .featured-talks-item {
            padding: 5rem;
        }
    }

    .hero {
        margin-bottom: 80px;
    }

    .hero-content {
        padding: 8rem 5rem !important;
    }

    @media (max-width: 769px) {
        .hero-content {
            padding: 3rem 2rem !important;
        }
    }

    .hero-image {
        aspect-ratio: 3 / 4;
        height: calc(100% + 80px);
    }
</style>
