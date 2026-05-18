<script>
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import { modals } from 'svelte-modals';
	import Modal from '$lib/ProfileModal.svelte';

	const storage_url = import.meta.env.VITE_STORAGE_URL;

	/**
	 * @typedef {Object} Props
	 * @property {import('./$types').PageData} data
	 */

	/** @type {Props} */
	let { data } = $props();

	function handleClick(speaker_profile) {
		modals.open(Modal, { profile: speaker_profile });
	}
</script>

<section class="hero page-title">
	<h3 class="title">{data.speakers.title}</h3>
</section>
<section class="section">
	<div class="container">
		<div class="content content-border">
			{#if data.speakers.content}
				<SvelteMarkdown options={{ mangle: false }} source={data.speakers.content} />
			{/if}

			<div class="columns is-multiline mt-6">
				{#each data.speaker_profiles as speaker_profile, i}
					<div class="column is-half">
						<div class="card speaker-card">
							<div class="card-image speaker-card__image-wrap is-clickable">
								<img
									class="speaker-card__image"
									onclick={() => handleClick(speaker_profile)}
									src="{storage_url}{speaker_profile.photo.url}"
									alt={speaker_profile.fullname}
								/>
							</div>

							<div class="card-content">
								{#if speaker_profile.is_guest}
									<p class="speaker-card__tag">Invitada principal</p>
								{/if}

								<p class="title is-4">
									{speaker_profile.fullname}
									{#if speaker_profile.nickname}
										"{speaker_profile.nickname}"
									{/if}
								</p>

								{#if speaker_profile.title}
									<p class="subtitle is-6">{speaker_profile.title}</p>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.speaker-card {
		position: relative;
		overflow: hidden;
		background: #ffffff;
		border: 1px solid rgba(13, 59, 68, 0.16);
		box-shadow: 0 0.75rem 2rem rgba(13, 59, 68, 0.1);
		transition:
			transform 0.22s ease,
			box-shadow 0.22s ease,
			border-color 0.22s ease;
	}

	.speaker-card::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		z-index: 1;
		height: 0.35rem;
		background: linear-gradient(90deg, #0d3b44, #43b2dc, #8d627b);
	}

	.speaker-card:hover {
		transform: translateY(-0.35rem);
		border-color: rgba(13, 59, 68, 0.32);
		box-shadow: 0 1.25rem 2.75rem rgba(13, 59, 68, 0.16);
	}

	.speaker-card__image-wrap {
		overflow: hidden;
		background: #0d3b44;
	}

	.speaker-card__image {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		transition:
			transform 0.28s ease,
			opacity 0.28s ease;
	}

	.speaker-card:hover .speaker-card__image {
		transform: scale(1.04);
		opacity: 0.94;
	}

	.speaker-card .card-content {
		position: relative;
		background:
			linear-gradient(rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.94)),
			radial-gradient(circle at top right, rgba(67, 178, 220, 0.18), transparent 40%);
	}

	.speaker-card__tag {
		display: inline-flex;
		width: fit-content;
		margin-bottom: 0.9rem;
		padding: 0.35rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		color: #ffffff;
		background: #0d3b44;
		border-left: 4px solid #43b2dc;
	}

	.speaker-card .title {
		margin-bottom: 0.35rem;
		color: #0d3b44;
	}

	.speaker-card .title::after {
		content: '';
		display: block;
		width: 4rem;
		height: 2px;
		margin-top: 0.6rem;
		background: #43b2dc;
	}

	.speaker-card .subtitle {
		color: #0d3b44;
	}
</style>
