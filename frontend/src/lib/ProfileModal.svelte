<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';

	let { isOpen, close, profile } = $props();
</script>

{#if isOpen}
	<div role="dialog" class="modal profile-modal">
		<div class="modal-background"></div>

		<div class="modal-card profile-modal__card">
			<header class="modal-card-head profile-modal__head">
				<div>
					<p class="modal-card-title profile-modal__title">
						{profile.fullname}
						{#if profile.nickname}
							«{profile.nickname}»
						{/if}
					</p>

					{#if profile.title}
						<p class="profile-modal__subtitle">{profile.title}</p>
					{/if}
				</div>

				<button onclick={close} class="delete profile-modal__close" aria-label="close"></button>
			</header>

			<section class="modal-card-body profile-modal__body">
				<div class="profile-modal__badges">
					{#if profile.is_guest}
						<span class="profile-modal__badge profile-modal__badge--main">Invitada principal</span>
					{/if}

					{#if profile.pronouns}
						<span class="profile-modal__badge profile-modal__badge--light">{profile.pronouns}</span>
					{/if}
				</div>

				<div class="content profile-modal__content">
					{#if profile.bio}
						<SvelteMarkdown options={{ mangle: false }} source={profile.bio} />
					{/if}
				</div>
			</section>

			{#if profile.activities?.length > 0}
				<footer class="modal-card-foot profile-modal__foot">
					<span class="profile-modal__foot-title">Participa en</span>

					<div class="profile-modal__activities">
						{#each profile.activities as activity}
							<a
								class="profile-modal__activity"
								onclick={close}
								href="/activities/{activity.documentId}"
							>
								{activity.title}
							</a>
						{/each}
					</div>
				</footer>
			{/if}
		</div>
	</div>
{/if}

<style>
	.profile-modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		pointer-events: auto;
	}

	.profile-modal__card {
		position: relative;
		overflow: hidden;
		width: min(92vw, 720px);
		border: 1px solid rgba(13, 59, 68, 0.16);
		border-radius: 0.5rem;
		box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.28);
	}

	.profile-modal__card::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		z-index: 1;
		height: 0.35rem;
		background: linear-gradient(90deg, #0d3b44, #43b2dc, #8d627b);
	}

	.profile-modal__head {
		position: relative;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 2rem 4rem 1.4rem 2rem;
		background:
			linear-gradient(rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.96)),
			radial-gradient(circle at top right, rgba(67, 178, 220, 0.2), transparent 42%);
		border-bottom: 1px solid rgba(13, 59, 68, 0.1);
	}

	.profile-modal__title {
		margin: 0;
		font-size: 1.55rem;
		line-height: 1.25;
		color: #0d3b44;
	}

	.profile-modal__title::after {
		content: '';
		display: block;
		width: 4rem;
		height: 2px;
		margin-top: 0.75rem;
		background: #43b2dc;
	}

	.profile-modal__subtitle {
		margin-top: 0.8rem;
		margin-bottom: 0;
		font-family: Lora, serif;
		font-size: 1rem;
		font-style: italic;
		color: #0d3b44;
	}

	.profile-modal__close {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		z-index: 2;
	}

	.profile-modal__body {
		padding: 1.8rem 2rem 2rem;
		background: #ffffff;
	}

	.profile-modal__badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1.25rem;
	}

	.profile-modal__badge {
		display: inline-flex;
		width: fit-content;
		padding: 0.35rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}

	.profile-modal__badge--main {
		color: #ffffff;
		background: #0d3b44;
		border-left: 4px solid #43b2dc;
	}

	.profile-modal__badge--light {
		color: #0d3b44;
		background: #d1f0f9;
	}

	.profile-modal__content {
		color: #0d3b44;
	}

	.profile-modal__foot {
		display: block;
		padding: 1.25rem 2rem 1.6rem;
		background: #0d3b44;
		border-top: 0;
	}

	.profile-modal__foot-title {
		display: block;
		margin-bottom: 0.8rem;
		font-family: Cinzel, serif;
		font-size: 0.85rem;
		font-weight: 700;
		text-transform: uppercase;
		color: #ffffff;
	}

	.profile-modal__activities {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.profile-modal__activity {
		display: inline-flex;
		padding: 0.4rem 0.75rem;
		color: #0d3b44;
		background: #ffffff;
		border: 1px solid rgba(255, 255, 255, 0.35);
	}

	.profile-modal__activity:hover {
		color: #ffffff;
		background: #43b2dc;
	}

	@media screen and (max-width: 768px) {
		.profile-modal {
			padding: 0.75rem;
		}

		.profile-modal__head {
			padding: 1.6rem 3.75rem 1.2rem 1.25rem;
		}

		.profile-modal__title {
			font-size: 1.25rem;
		}

		.profile-modal__body {
			padding: 1.4rem 1.25rem 1.6rem;
		}

		.profile-modal__foot {
			padding: 1.15rem 1.25rem 1.35rem;
		}

		.profile-modal__close {
			top: 1.15rem;
			right: 1.15rem;
			display: block !important;
			z-index: 10;
			width: 32px;
			height: 32px;
			min-width: 32px;
			min-height: 32px;
		}
	}
</style>
