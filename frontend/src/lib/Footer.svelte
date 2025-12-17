<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import logoFallback from '../assets/images/easyfest_okhand.png'

	const storage_url = import.meta.env.VITE_STORAGE_URL;
	let { data } = $props();

	const PLATFORMS_MAP = {
		github: {
			name: 'GitHub',
			url: '/img/icon-github.svg'
		},
		mastodon: {
			name: 'Mastodon',
			url: '/img/icon-mastodon.svg'
		},
		youtube: {
			name: 'YouTube',
			url: '/img/icon-youtube.svg'
		},
		twitter: {
			name: 'Twitter',
			url: '/img/icon-twitter.svg'
		},
		instagram: {
			name: 'Instagram',
			url: '/img/icon-instagram.svg'
		},
		linkedin: {
			name: 'LinkedIn',
			url: '/img/icon-linkedin.svg'
		}
	};
</script>

<footer class="footer">
	<div class="container">
		<div class="columns is-6">
			<div class="column is-one-third">
				<a class="logo_footer" href="/">
					{#if data.logo_horiz}
						<img alt={data.title} src="{storage_url}{data.logo_horiz.url}" />
					{:else}
						<img alt={data.title} src={logoFallback} />
					{/if}
				</a>
			</div>
			{#if data.show_cookie_policy || data.show_privacy_policy}
				<div class="column">
					<ul>
						{#if data.show_cookie_policy}
							<li>
								<a href="/cookie-policy" class="text--medium">{m.cookie_policy()}</a>
							</li>
						{/if}
						{#if data.show_privacy_policy}
							<li>
								<a href="/privacy-policy" class="text--medium"
									>{m.privacy_policy()}</a
								>
							</li>
						{/if}
					</ul>
				</div>
			{/if}
			<div class="column">
                <ul>
                    {#if data.show_org_team}
                    <li><a href="/org-team" class="text--medium">{m.org_team()}</a></li>
                    {/if}
                    <li><a href="/contact-info" class="text--medium">{m.contact_info()}</a></li>
                    {#if data.show_code_of_conduct}
                    <li><a href="/code-of-conduct" class="text--medium">{m.code_of_conduct()}</a></li>
                    {/if}
                    {#if data.show_press_kit}
                    <li><a href="/press-kit" class="text--medium">{m.press_kit()}</a></li>
                    {/if}
                </ul>
            </div>
			{#if data.social_media_links?.length > 0}
				<div class="column is-flex is-flex-direction-column is-justify-content-center is-align-items-center is-one-third p-0">
					<ul>
						{#each data.social_media_links as link}
							{@const icon = PLATFORMS_MAP[link.platform]}
							<li class="is-inline-block m-2">
								<a
									href={link.url}
									rel="me"
									target="_blank"
									class="icon text--medium"
								>
									<img src={icon.url} alt={link.label || icon.name} />
								</a>
							</li>
						{/each}
						<li class="is-inline-block m-2">
							<a
								href="https://www.facebook.com/profile.php?id=61571579560904 "
								rel="me"
								target="_blank"
								class="icon"
							>
								<i class="fab fa-facebook-f fa-lg"></i>
							</a>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</div>
</footer>
