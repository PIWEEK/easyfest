<script>
    import "../app.scss"
  
    const storage_url = import.meta.env.VITE_STORAGE_URL
    export let data;
</script>

<style>
    .navbar-center {
        width: 100%;
        justify-content: center;
    }
</style>

<nav data-sveltekit-reload class="navbar is-dark is-spaced" aria-label="main-navigation">
     <div class="container">
        <div class="navbar-brand">
            <a href="/" class="navbar-item"><img alt="Logo" src="{storage_url}{data.logo_small.data.attributes.url}"/></a>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start navbar-center">
                <a class="navbar-item" href="/about-us">About</a>
                <a class="navbar-item" href="/accommodation-info">Accomodation info</a>
                <a class="navbar-item" href="/code-of-conduct">Code of Conduct</a>
                <a class="navbar-item" href="/contact-info">Contact info</a>
                <a class="navbar-item" href="/cookie-policy">Cookie policy</a>
                <a class="navbar-item" href="/press-kit">Press kit</a>
                <a class="navbar-item" href="/privacy-policy">Privacy policy</a>
                <a class="navbar-item" href="/seo">SEO</a>
                <a class="navbar-item" href="/streaming">Streaming</a>
                <a class="navbar-item" href="/venue-info">Venue info</a>
                <a class="navbar-item" href="/activities">Activities</a>
                <a class="navbar-item" href="/public-profiles">Public profiles</a>
            </div>
            <div class="navbar-end">
                <a href="https://github.com/..." class="navbar-item">GitHub</a>
                <a href="https://discord.app/..." class="navbar-item">Discord</a>
            </div>
        </div>
    </div>
</nav>

<slot></slot>