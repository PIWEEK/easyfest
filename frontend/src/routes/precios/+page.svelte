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
				<thead><tr><th>Descripción</th><th>Tipo</th><th>Desglose</th><th>Total</th></tr></thead
				><tbody>
					<tr
						><td>1 Adulto</td><td>INDIVIDUAL</td><td>ADULTO 1 -&gt; 368 €<br /></td><td
							>368,00 €<br /></td
						></tr
					><tr
						><td>1 Adulto + Niño (0-2 Años)</td><td>INDIVIDUAL</td><td
							>ADULTO 1 -&gt; 368 €<br /><br />NIÑO -&gt; 0 €<br /></td
						><td>368,00 €<br /></td></tr
					><tr
						><td>1 Adulto + 2 Niños (0-2 Años)</td><td>DOBLE</td><td
							>ADULTO 1 -&gt; 260 €<br /><br />NIÑO 1 -&gt; 0 €<br /><br />NIÑO 2 -&gt; 202 €<br
							/></td
						><td>462,00 €<br /></td></tr
					><tr
						><td>1 Adulto + 1 Niño (3-11 Años)</td><td>INDIVIDUAL</td><td
							>ADULTO 1 -&gt; 368 €<br /><br />NIÑO 1 -&gt; 108 €<br /></td
						><td>476,00 €<br /></td></tr
					><tr
						><td>1 Adulto + 1 Niño (0-2 Años) + Niño (3-11 Años)</td><td>DOBLE</td><td
							>ADULTO 1 -&gt; 260 €<br /><br />NIÑO 1 -&gt; 0 €<br /><br />NIÑO 2 -&gt; 202 €<br
							/></td
						><td>462,00 €<br /></td></tr
					><tr
						><td>1 Adulto + 2 Niños (3-11 Años)</td><td>DOBLE</td><td
							>ADULTO 1 -&gt; 260 €<br /><br />NIÑO 1 -&gt; 108 €<br /><br />NIÑO 2 -&gt; 202 €<br
							/></td
						><td>570,00 €<br /></td></tr
					><tr
						><td>2 Adultos</td><td>DOBLE</td><td
							>ADULTO 1 -&gt; 260 €<br /><br />ADULTO 2 -&gt; 260 €<br /></td
						><td>520,00 €<br /></td></tr
					><tr
						><td>2 Adultos + Niño (0-2 Años)</td><td>DOBLE</td><td
							>ADULTO 1 -&gt; 260 €<br /><br />ADULTO 2 -&gt; 260 €<br /><br />NIÑO 1 -&gt; 0 €<br
							/></td
						><td>520,00 €<br /></td></tr
					><tr
						><td>2 Adultos + Niño (3-11 Años)</td><td>DOBLE</td><td
							>ADULTO 1 -&gt; 260 €<br /><br />ADULTO 2 -&gt; 260 €<br /><br />NIÑO 1 -&gt; 108 €<br
							/></td
						><td>628,00 €<br /></td></tr
					><tr
						><td>2 Adultos + 2 Niños (0-2 Años)</td><td>TRIPLE</td><td
							>ADULTO 1 -&gt; 241 €<br /><br />ADULTO 2 -&gt; 241 €<br /><br />NIÑO 1 -&gt; 0 €<br
							/><br />NIÑO 2 -&gt; 202 €<br /></td
						><td>684,00 €<br /></td></tr
					><tr
						><td>2 Adultos + Niño (0-2 Años) + Niño (3-11 Años)</td><td>TRIPLE</td><td
							>ADULTO 1 -&gt; 241 €<br /><br />ADULTO 2 -&gt; 241 €<br /><br />NIÑO 1 -&gt; 0 €<br
							/><br />NIÑO 2 -&gt; 202 €<br /></td
						><td>684,00 €<br /></td></tr
					><tr
						><td>2 Adultos + 2 Niños (3-11 Años)</td><td>TRIPLE</td><td
							>ADULTO 1 -&gt; 241 €<br /><br />ADULTO 2 -&gt; 241 €<br /><br />NIÑO 1 -&gt; 108 €<br
							/><br />NIÑO 2 -&gt; 202 €<br /></td
						><td>792,00 €<br /></td></tr
					><tr
						><td>3 Adultos</td><td>TRIPLE</td><td
							>ADULTO 1 -&gt; 241 €<br /><br />ADULTO 2 -&gt; 241 €<br /><br />ADULTO 3 -&gt; 241 €<br
							/></td
						><td>723,00 €<br /></td></tr
					><tr
						><td>3 Adultos + Niño (0-2 Años)</td><td>TRIPLE</td><td
							>ADULTO 1 -&gt; 241 €<br /><br />ADULTO 2 -&gt; 241 €<br /><br />ADULTO 3 -&gt; 241 €<br
							/><br />NIÑO 1 -&gt; 0 €<br /></td
						><td>723,00 €<br /></td></tr
					><tr
						><td>3 Adultos + Niño (3-11 Años)</td><td>TRIPLE</td><td
							>ADULTO 1 -&gt; 241 €<br /><br />ADULTO 2 -&gt; 241 €<br /><br />ADULTO 3 -&gt; 241 €<br
							/><br />NIÑO 1 -&gt; 108 €<br /></td
						><td>831,00 €<br /></td></tr
					><!----></tbody
				>
			</table>
		</div>
	</div>
</section>
