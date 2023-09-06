<script>

    const storage_url = import.meta.env.VITE_STORAGE_URL
    /** @type {import('./$types').PageData} */
    export let data;

</script>

<section class="hero is-dark">
    <div class="hero-body">
        <img src="{storage_url}{data.logo_small.data.attributes.url}"/>
        <p class="title has-text-centered has-text-white">Building Freedom for Design</p>
        <p class="subtitle has-text-centered has-text-white">Easy Fest is the Design event that brought designers and developers together in Barcelona in June 28-30. We had an amazing time. See you next year!</p>
    </div>
</section>

<section class="section">
    <div class="container">
        <!-- FIXME hardcoded URL -->
        <img src="{storage_url}/uploads/SALA_GRAN_teatre_482d9e9b7f.jpg"/>
    </div>
</section>

<style>
    img {
        width: 100%;
    }
</style>