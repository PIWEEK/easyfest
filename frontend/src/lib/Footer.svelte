<script>
    import logoFallback from '../assets/images/easyfest-logo.svg'

    const storage_url = import.meta.env.VITE_STORAGE_URL
    export let data;
</script>

<footer class="footer has-background-dark has-text-white">
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
                <p class="text--small--uppercase mb-4 has-text-white">Legal</p>
                <ul>
                    {#if data.show_cookie_policy}
                    <li><a href="/cookie-policy" class="text--medium has-text-white">Cookie policy</a></li>
                    {/if}
                    {#if data.show_privacy_policy}
                    <li><a href="/privacy-policy" class="text--medium has-text-white">Privacy policy</a></li>
                    {/if}
                </ul>
            </div>
            {/if}
            <div class="column">
                <p class="text--small--uppercase mb-4">{data.title}</p>
                <ul>
                    {#if data.show_org_team}
                    <li><a href="/org-team" class="text--medium has-text-white">Org team</a></li>
                    {/if}
                    <li><a href="/contact-info" class="text--medium has-text-white">Contact info</a></li>
                    {#if data.show_code_of_conduct}
                    <li><a href="/code-of-conduct" class="text--medium has-text-white">Code of Conduct</a></li>
                    {/if}
                    {#if data.show_press_kit}
                    <li><a href="/press-kit" class="text--medium has-text-white">Press kit</a></li>
                    {/if}
                </ul>
            </div>
            <div class="column">
                <p class="text--small--uppercase mb-4">More contacts</p>
                <ul>
                    <li><a href="https://github.com/..." class="text--medium has-text-white">GitHub</a></li>
                    <li><a href="https://joinmastodon.org/..." class="text--medium has-text-white">Mastodon</a></li>
                </ul>
            </div>
        </div>
    </div>
</footer>
