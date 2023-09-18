<script>
    const storage_url = import.meta.env.VITE_STORAGE_URL
    export let data;
</script>

<style lang="scss">
    @use "bulma/sass/utilities/initial-variables.sass";

    .footer {
        background-image: url("/img/footer-bg.jpg");
        p, a {
            color: initial-variables.$white;
        }
        .footer-heading {
            font-weight: bold;
            margin-bottom: 1rem;
        }
    }
</style>

<footer class="footer">
    <div class="container">
        <div class="columns">
            <div class="column">
                {#if data.logo_horiz.data}
                <a href="/"><img alt="Logo" src="{storage_url}{data.logo_horiz.data.attributes.url}"/></a>
                {/if}
            </div>
            <div class="column">
                <p class="footer-heading has-text-white">Legal</p>
                <p><a href="/cookie-policy" class="has-text-white">Cookie policy</a></p>
                <p><a href="/privacy-policy">Privacy policy</a></p>
            </div>
            <div class="column">
                <p class="footer-heading">EasyFest</p>
                <p><a href="/org-team">Org team</a></p>
                <p><a href="/contact-info">Contact info</a></p>
                <p><a href="/code-of-conduct">Code of Conduct</a></p>
                <p><a href="/press-kit">Press kit</a></p>
            </div>
            <div class="column">
                <p class="footer-heading">More contacts</p>
                <p><a href="https://github.com/...">GitHub</a></p>
                <p><a href="https://joinmastodon.org/...">Mastodon</a></p>
            </div>
        </div>
    </div>
</footer>