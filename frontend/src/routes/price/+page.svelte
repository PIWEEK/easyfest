<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import * as m from '$lib/paraglide/messages.js'
	type Price = { name: string; description: string; value: number | string; currency: string };
	interface Data {
		prices: Price[];
		content?: string;
	}
	export let data: Data;
</script>

<section class="hero page-title">
	<h3 class="title">{m.prices()}</h3>
</section>
<section class="section">
	<div class="container">
		<div class="content content-border">
			<div class="columns">
				<div class="column is-four-fifths">
					{#if data.content}
						<SvelteMarkdown options={{ mangle: false }} source={data.content} />
					{/if}
				</div>
			</div>
		</div>
		<div>
			<table class="table table-prices is-fullwidth is-striped" id="priceTable">
				<tbody>
					{#if data.prices && data.prices.length > 0}
								{#each data.prices as priceObj}
									{#if priceObj}
										<tr>
											<td>{(priceObj as Price).name}</td>
											<td>{(priceObj as Price).description}</td>
											<td>{(priceObj as Price).value} {(priceObj as Price).currency}</td>
										</tr>
									{/if}
								{/each}
					{/if}
				</tbody>
			</table>
		</div>
	</div>
</section>
