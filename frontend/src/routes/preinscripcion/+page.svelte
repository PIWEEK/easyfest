<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	let { data } = $props();
</script>

<section class="hero page_title">
	<h3 class="title">{data.title}</h3>
</section>
<section class="section">
	<div class="container">
		<div class="content content_border">
			<div class="columns">
				<div class="column is-four-fifths">
					{#if data.content}
					<SvelteMarkdown options={{ mangle: false }} source={data.content} />
					{/if}
					<div class="columns is-multiline is-centered mt-6">
						<div class="column is-6">
							<a class="button is-primary is-family-secondary is-size-5 is-fullwidth" href="/hab-individual"
								>Habitación Individual</a
							>
						</div>
						<div class="column is-6">
							<a class="button is-primary is-family-secondary is-size-5 is-fullwidth" href="/hab-doble"
								>Habitación Doble</a
							>
						</div>
						<div class="column is-6">
							<a class="button is-primary is-family-secondary is-size-5 is-fullwidth" href="/hab-triple"
								>Habitación Triple</a
							>
						</div>
						<div class="column is-6">
							<a class="button is-primary is-family-secondary is-size-5 is-fullwidth" href="/hab-aleatoria"
								>Habitación Aleatoria</a
							>
						</div>
					</div>
				</div>
        <div class="column">
					<img class="" src="src/assets/images/Zanahorias_Hobbit_TR.webp" alt="comida hobbit" />
				</div>
			</div>
		</div>
	</div>
</section>