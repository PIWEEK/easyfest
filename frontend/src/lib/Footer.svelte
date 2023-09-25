<script>
    import logoFallback from '../assets/images/easyfest-logo.svg'

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
                <a href="/">
                    {#if data.logo_horiz.data}
                    <img alt={data.title} src="{storage_url}{data.logo_horiz.data.attributes.url}"/>
                    {:else}
                    <img alt={data.title} src={logoFallback}/>
                    {/if}
                </a>
            </div>
            {#if data.show_cookie_policy || data.show_privacy_policy}
            <div class="column">
                <p class="footer-heading has-text-white">Legal</p>
                {#if data.show_cookie_policy}
                <p><a href="/cookie-policy" class="has-text-white">Cookie policy</a></p>
                {/if}
                {#if data.show_privacy_policy}
                <p><a href="/privacy-policy">Privacy policy</a></p>
                {/if}
            </div>
            {/if}
            <div class="column">
                <p class="footer-heading">EasyFest</p>
                {#if data.show_org_team}
                <p><a href="/org-team">Org team</a></p>
                {/if}
                <p><a href="/contact-info">Contact info</a></p>
                {#if data.show_code_of_conduct}
                <p><a href="/code-of-conduct">Code of Conduct</a></p>
                {/if}
                {#if data.show_press_kit}
                <p><a href="/press-kit">Press kit</a></p>
                {/if}
            </div>
            <div class="column">
                <p class="footer-heading">More contacts</p>
                <p><a href="https://github.com/...">GitHub</a></p>
                <p><a href="https://joinmastodon.org/...">Mastodon</a></p>
            </div>
        </div>
    </div>
</footer>
