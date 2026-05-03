<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown'
  import * as m from '$lib/paraglide/messages.js'
  let { data } = $props();
</script>
<section class="hero page-title">
  <h3 class="title">{data.title || m.venue_info()}</h3>
</section>
<section class="section">
    <div class="container">
        <div class="content content-border">
          <div class="columns">
            <div class="column is-five-fifths">
              {#if data.content}
                <div class="strapi-markdown venue-markdown">
                  <SvelteMarkdown options={{mangle: false}} source={data.content}/>
                </div>
              {/if}
            </div>
          </div>
        </div>
    </div>
</section>

<style>
	:global(.venue-markdown) {
		max-width: 1100px;
		margin: 0 auto;
	}

	:global(.venue-markdown p) {
		font-size: clamp(1.05rem, 1.8vw, 1.45rem);
		line-height: 1.65;
		margin: 1.5rem 0;
	}

	:global(.venue-markdown strong) {
		font-weight: 700;
		color: #0d3b44;
	}

	/* Galería automática para párrafos Markdown que contienen imágenes */
	:global(.venue-markdown p:has(img)) {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.5rem;
		margin: 2.5rem 0;
		padding: 1rem;
		border-radius: 1.5rem;
		background: linear-gradient(
			135deg,
			rgba(204, 234, 245, 0.65),
			rgba(255, 255, 255, 0.92)
		);
		box-shadow: 0 18px 45px rgba(13, 59, 68, 0.12);
	}

	:global(.venue-markdown p:has(img) img) {
		width: 100%;
		height: 320px;
		object-fit: cover;
		display: block;
		border-radius: 1rem;
		box-shadow: 0 10px 25px rgba(13, 59, 68, 0.18);
		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease,
			filter 0.25s ease;
	}

	/* Efecto tipo postal */
	:global(.venue-markdown p:has(img) img:first-child) {
		transform: rotate(-1.2deg);
	}

	:global(.venue-markdown p:has(img) img:nth-child(2)) {
		transform: rotate(1.2deg);
	}

	:global(.venue-markdown p:has(img) img:hover) {
		transform: rotate(0deg) translateY(-4px) scale(1.02);
		box-shadow: 0 18px 35px rgba(13, 59, 68, 0.26);
		filter: saturate(1.08);
	}

	/* Separador elegante después de la galería */
	:global(.venue-markdown p:has(img) + p) {
		margin-top: 2rem;
		padding-top: 1.5rem;
	}

	/* Ajuste para imágenes sueltas, si alguna vez pones solo una */
	:global(.venue-markdown p:has(img) img:only-child) {
		grid-column: 1 / -1;
		max-width: 760px;
		margin: 0 auto;
	}

	@media screen and (max-width: 768px) {
		:global(.venue-markdown) {
			max-width: 100%;
		}

		:global(.venue-markdown p) {
			font-size: 1.05rem;
			line-height: 1.6;
			margin: 1.25rem 0;
		}

		:global(.venue-markdown p:has(img)) {
			grid-template-columns: 1fr;
			gap: 1rem;
			padding: 0.75rem;
			margin: 1.75rem 0;
			border-radius: 1.25rem;
			box-shadow: 0 12px 28px rgba(13, 59, 68, 0.12);
		}

		:global(.venue-markdown p:has(img) img),
		:global(.venue-markdown p:has(img) img:first-child),
		:global(.venue-markdown p:has(img) img:nth-child(2)) {
			width: 100%;
			height: auto;
			max-height: none;
			transform: none;
			border-radius: 0.9rem;
		}

		:global(.venue-markdown p:has(img) img:hover) {
			transform: none;
			box-shadow: 0 10px 25px rgba(13, 59, 68, 0.18);
		}

		:global(.venue-markdown p:has(img) + p) {
			margin-top: 1.5rem;
			padding-top: 1.25rem;
		}
	}
</style>