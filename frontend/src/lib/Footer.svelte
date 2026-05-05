<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import logoFallback from '../assets/images/easyfest_okhand.png';

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

<footer class="footer site-footer">
	<div class="container site-footer__container">
		<div class="columns is-6 site-footer__columns">
			<div class="column is-one-third site-footer__column site-footer__logo-column">
				<a
					class="logo_footer"
					href="https://www.sociedadtolkien.org/"
					target="_blank"
					rel="noopener noreferrer"
				>
					{#if data.logo_horiz}
						<img alt={data.title} src="{storage_url}{data.logo_horiz.url}" />
					{:else}
						<img alt={data.title} src={logoFallback} />
					{/if}
				</a>
			</div>

			{#if data.show_cookie_policy || data.show_privacy_policy}
				<div class="column site-footer__column site-footer__legal-column">
					<ul>
						{#if data.show_cookie_policy}
							<li>
								<a href="/cookie-policy" class="text--medium">{m.cookie_policy()}</a>
							</li>
						{/if}

						{#if data.show_privacy_policy}
							<li>
								<a href="/privacy-policy" class="text--medium">{m.privacy_policy()}</a>
							</li>
						{/if}
					</ul>
				</div>
			{/if}

			<div class="column site-footer__column site-footer__links-column">
				<ul>
					{#if data.show_org_team}
						<li>
							<a href="/org-team" class="text--medium">{m.org_team()}</a>
						</li>
					{/if}

					<li>
						<a href="/contact-info" class="text--medium">{m.contact_info()}</a>
					</li>

					{#if data.show_code_of_conduct}
						<li>
							<a href="/code-of-conduct" class="text--medium">{m.code_of_conduct()}</a>
						</li>
					{/if}

					{#if data.show_press_kit}
						<li>
							<a href="/press-kit" class="text--medium">{m.press_kit()}</a>
						</li>
					{/if}
				</ul>
			</div>

			{#if data.social_media_links?.length > 0}
				<div class="column is-one-third p-0 site-footer__column site-footer__social-column">
					<ul>
						{#each data.social_media_links as link}
							{@const icon = PLATFORMS_MAP[link.platform]}

							<li class="is-inline-block m-2">
								<a href={link.url} rel="me" target="_blank" class="icon text--medium">
									<img src={icon.url} alt={link.label || icon.name} />
								</a>
							</li>
						{/each}

						<li class="is-inline-block m-2">
							<a
								href="https://www.facebook.com/profile.php?id=61571579560904"
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

<style>
	.site-footer {
		background: var(--bulma-dark, #073b42);
	}

	.site-footer__columns {
		align-items: center;
		margin-right: 0;
		margin-left: 0;
	}

	.site-footer__column {
		box-sizing: border-box;
	}

	.site-footer__social-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.site-footer__social-column ul {
		margin: 0;
	}

	.site-footer__social-column img {
		display: block;
		max-width: 1.5rem;
		height: auto;
	}

	.site-footer .logo_footer {
		display: inline-flex;
		align-items: center;
		max-width: 100%;
	}

	.site-footer .logo_footer img {
		display: block;
		width: auto;
		max-width: 100%;
		height: auto;
	}

	@media (max-width: 1023px) {
		.site-footer {
			padding-right: 0;
			padding-left: 0;
			text-align: center;
		}

		.site-footer__container {
			width: 100%;
			max-width: 100%;
			padding-right: 0;
			padding-left: 0;
		}

		.site-footer__columns {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			margin-right: 0;
			margin-left: 0;
		}

		.site-footer__column {
			display: flex;
			justify-content: center;
			width: 100%;
			max-width: 100%;
			padding-right: 0;
			padding-left: 0;
			text-align: center;
		}

		.site-footer__legal-column {
			order: 1;
		}

		.site-footer__links-column {
			order: 2;
		}

		.site-footer__social-column {
			order: 3;
			padding: 0;
		}

		.site-footer__logo-column {
			order: 4;
		}

		.site-footer ul {
			width: 100%;
			margin: 0;
			padding: 0;
			text-align: center;
			list-style: none;
		}

		.site-footer li {
			text-align: center;
		}

		.site-footer .logo_footer {
			display: flex;
			justify-content: center;
			width: 100%;
		}

		.site-footer .logo_footer img {
			display: block;
			width: auto;
			max-width: min(100%, 15rem);
			height: auto;
			margin: 0 auto;
		}
	}
</style>
