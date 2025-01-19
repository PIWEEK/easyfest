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
				</div>
        		<div class="column">
					<img class="" src="src/assets/images/Zanahorias_Hobbit_TR.webp" alt="comida hobbit" />
				</div>
			</div>
		</div>
	</div>
</section>