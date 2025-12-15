<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import logoFallback from '../assets/images/easyfest-logo.svg';

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

<footer class="footer has-text-white">
	<div class="container">
		<div class="columns is-6">
			<div class="column is-one-third">
				<a class="logo_footer" href="https://www.sociedadtolkien.org/">
					{#if data.logo_horiz}
						<img alt={data.title} src="{storage_url}{data.logo_horiz.url}" />
					{:else}
						<img alt={data.title} src={logoFallback} />
					{/if}
				</a>
			</div>
			{#if data.show_cookie_policy || data.show_privacy_policy}
				<div class="column">
					<p class="text--small--uppercase mb-4 has-text-white">{m.legal()}</p>
					<ul>
						{#if data.show_cookie_policy}
							<li>
								<a href="/cookie-policy" class="text--medium has-text-white">{m.cookie_policy()}</a>
							</li>
						{/if}
						{#if data.show_privacy_policy}
							<li>
								<a href="/privacy-policy" class="text--medium has-text-white"
									>{m.privacy_policy()}</a
								>
							</li>
						{/if}
					</ul>
				</div>
			{/if}
			<!-- <div class="column">
                <p class="text--small--uppercase mb-4">{data.title}</p>
                <ul>
                    {#if data.show_org_team}
                    <li><a href="/org-team" class="text--medium has-text-white">{m.org_team()}</a></li>
                    {/if}
                    <li><a href="/contact-info" class="text--medium has-text-white">{m.contact_info()}</a></li>
                    {#if data.show_code_of_conduct}
                    <li><a href="/code-of-conduct" class="text--medium has-text-white">{m.code_of_conduct()}</a></li>
                    {/if}
                    {#if data.show_press_kit}
                    <li><a href="/press-kit" class="text--medium has-text-white">{m.press_kit()}</a></li>
                    {/if}
                </ul>
            </div> -->
			<div class="column">
				<h5 class="is-family-secondary">Contacto</h5>
				<p class="is-size-6">
					Si tienes alguna duda, sugerencia, pregunta... ¡escríbenos! Puedes contactar escribiendo un correo a: <a href="mailto:estelcon2025@sociedadtolkien.org">estelcon2025@sociedadtolkien.org</a>
				</p>
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
									class="icon text--medium has-text-white"
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
								class="icon has-text-white"
							>
								<i class="fab fa-facebook-f fa-lg"></i>
							</a>
						</li>
					</ul>
				</div>
			{/if}
		</div>
		<div class="is-size-6 is-flex is-justify-content-center is-align-content-center">
            <p>
			Ilustraciones de nuestra socia <a
            href="https://www.instagram.com/lorenagarcia_art/"
            target="_blank">  Lorena "Simbelmina" <i class="fab fa-instagram"></i>
			</a></p>
		</div>
	</div>
</footer>
