<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';

	let { isOpen, close, activity } = $props();
</script>

{#if isOpen}
	<div role="dialog" class="modal activity-modal">
		<div class="modal-background"></div>

		<div class="modal-card activity-modal__card">
			<header class="modal-card-head activity-modal__head">
				<div>
					<p class="modal-card-title activity-modal__title">{activity.title}</p>

					{#if activity.short_description}
						<p class="activity-modal__subtitle">{activity.short_description}</p>
					{/if}
				</div>

				<button onclick={close} class="delete activity-modal__close" aria-label="close"></button>
			</header>

			<section class="modal-card-body activity-modal__body">
				<div class="content activity-modal__content">
					{#if activity.long_description}
						<SvelteMarkdown options={{ mangle: false }} source={activity.long_description} />
					{/if}
				</div>
			</section>

			{#if activity.tag1 || activity.tag2}
				<footer class="modal-card-foot activity-modal__foot">
					<div class="activity-modal__tags">
						{#if activity.tag1}
							<span class="activity-modal__tag activity-modal__tag--primary">{activity.tag1}</span>
						{/if}

						{#if activity.tag2}
							<span class="activity-modal__tag activity-modal__tag--secondary">{activity.tag2}</span
							>
						{/if}
					</div>
				</footer>
			{/if}
		</div>
	</div>
{/if}

<style>
	.activity-modal {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		pointer-events: auto;
	}

	.activity-modal__card {
		position: relative;
		overflow: hidden;
		width: min(92vw, 760px);
		border: 1px solid rgba(13, 59, 68, 0.16);
		border-radius: 0.5rem;
		box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.28);
	}

	.activity-modal__card::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		z-index: 1;
		height: 0.35rem;
		background: linear-gradient(90deg, #0d3b44, #43b2dc, #8d627b);
	}

	.activity-modal__head {
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

	.activity-modal__title {
		margin: 0;
		font-size: 1.55rem;
		line-height: 1.25;
		color: #0d3b44;
		flex-grow: initial;
		flex-shrink: initial;
	}

	.activity-modal__title::after {
		content: '';
		display: block;
		width: 4rem;
		height: 2px;
		margin-top: 0.75rem;
		background: #43b2dc;
	}

	.activity-modal__subtitle {
		margin-top: 0.8rem;
		margin-bottom: 0;
		font-family: Lora, serif;
		font-size: 1rem;
		font-style: italic;
		color: #0d3b44;
	}

	.activity-modal__close {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		z-index: 2;
	}

	.activity-modal__body {
		padding: 1.8rem 2rem 2rem;
		background: #ffffff;
	}

	.activity-modal__content {
		color: #0d3b44;
	}

	.activity-modal__content :global(img) {
		display: block;
		width: min(100%, 34rem);
		height: auto;
		margin: 1rem auto;
		border-radius: 0.35rem;
		box-shadow: 0 1rem 2rem rgba(13, 59, 68, 0.16);
	}

	.activity-modal__foot {
		display: block;
		padding: 1.15rem 2rem 1.35rem;
		background: #0d3b44;
		border-top: 0;
	}

	.activity-modal__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.activity-modal__tag {
		display: inline-flex;
		width: fit-content;
		padding: 0.35rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}

	.activity-modal__tag--primary {
		color: #ffffff;
		background: #8d627b;
		border-left: 4px solid #43b2dc;
	}

	.activity-modal__tag--secondary {
		color: #0d3b44;
		background: #d1f0f9;
	}

	@media screen and (max-width: 768px) {
		.activity-modal {
			padding: 0.75rem;
		}

		.activity-modal__head {
			padding: 1.6rem 3.75rem 1.2rem 1.25rem;
		}

		.activity-modal__title {
			font-size: 1.25rem;
		}

		.activity-modal__body {
			padding: 1.4rem 1.25rem 1.6rem;
		}

		.activity-modal__foot {
			padding: 1.15rem 1.25rem 1.35rem;
		}

		.activity-modal__close {
			top: 1.15rem;
			right: 1.15rem;
			display: block !important;
			z-index: 10;
			width: 32px;
			height: 32px;
			min-width: 32px;
			min-height: 32px;
		}

		.activity-modal__content :global(p:has(img)) {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			align-items: center;
			justify-content: center;
		}

		.activity-modal__content :global(p:has(img) img) {
			width: min(100%, 17rem);
			margin: 0;
		}
	}
</style>
