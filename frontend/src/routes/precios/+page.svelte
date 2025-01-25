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
				<div class="column is-flex is-justify-content-center is-align-items-center">
					<img class="img-draw" src="src/assets/images/Quesos_Hobbit_TR.webp" alt="puerta hobbit" />
				</div>
			</div>
		</div>
		<div>
			<table class="table table-precios is-fullwidth is-striped" id="priceTable">
				<thead><tr><th>Descripción</th><th>Tipo</th><th>EC Parcial</th><th>EC Completa</th></tr></thead
				><tbody>
					<tr
						><td>1 Adulto</td><td>INDIVIDUAL</td><td>261 €</td><td
							>368 €</td
						></tr
					><tr
						><td>1 Adulto + Niño (0-2 Años)</td><td>INDIVIDUAL</td><td
							>261 €</td
						><td>368 €</td></tr
					><tr
						><td>1 Adulto + 2 Niños (0-2 Años)</td><td>DOBLE</td><td
							>335 €</td
						><td>462 €</td></tr
					><tr
						><td>1 Adulto + 1 Niño (3-11 Años)</td><td>INDIVIDUAL</td><td
							>346 €</td
						><td>476 €</td></tr
					><tr
						><td>1 Adulto + 1 Niño (0-2 Años) + Niño (3-11 Años)</td><td>DOBLE</td><td
							>335 €</td
						><td>462 €</td></tr
					><tr
						><td>1 Adulto + 2 Niños (3-11 Años)</td><td>DOBLE</td><td
							>420 €</td
						><td>570 €</td></tr
					><tr
						><td>2 Adultos</td><td>DOBLE</td><td
							>378 €</td
						><td>520 €</td></tr
					><tr
						><td>2 Adultos + Niño (0-2 Años)</td><td>DOBLE</td><td
							>378 €</td
						><td>520 €</td></tr
					><tr
						><td>2 Adultos + Niño (3-11 Años)</td><td>DOBLE</td><td
							>463 €</td
						><td>628 €</td></tr
					><tr
						><td>2 Adultos + 2 Niños (0-2 Años)</td><td>TRIPLE</td><td
							>498,80 €</td
						><td>684 €</td></tr
					><tr
						><td>2 Adultos + Niño (0-2 Años) + Niño (3-11 Años)</td><td>TRIPLE</td><td
							>498,80 €</td
						><td>684 €</td></tr
					><tr
						><td>2 Adultos + 2 Niños (3-11 Años)</td><td>TRIPLE</td><td
							>583,80</td
						><td>792 €<br /></td></tr
					><tr
						><td>3 Adultos</td><td>TRIPLE</td><td
							>529,20</td
						><td>723 €</td></tr
					><tr
						><td>3 Adultos + Niño (0-2 Años)</td><td>TRIPLE</td><td
							>529,20 €</td
						><td>723 €</td></tr
					><tr
						><td>3 Adultos + Niño (3-11 Años)</td><td>TRIPLE</td><td
							>614,20 €</td
						><td>831 €</td></tr
					><!----></tbody
				>
			</table>
		</div>
	</div>
</section>
