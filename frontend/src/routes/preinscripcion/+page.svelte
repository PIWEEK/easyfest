<script lang="ts">
	 import SvelteMarkdown from '@humanspeak/svelte-markdown';
	 type Option = { label: string; href: string };
	 interface Data {
		 title: string;
		 content?: string;
		 enrollment_active?: boolean;
		 options?: Option[];
	 }
			export let data: Data;
			const options: Option[] = Array.isArray(data.options) ? data.options as Option[] : [];
</script>

<section class="hero page-title">
	<h3 class="title">{data.title}</h3>
</section>
<section class="section">
	<div class="container">
		<div class="content content-border">
			<div class="columns">
				<div class="column is-four-fifths">
					{#if data.content}
					<SvelteMarkdown options={{ mangle: false }} source={data.content} />
					{/if}
					{#if data.enrollment_active && options.length > 0}
					<div class="columns is-multiline is-centered mt-6">
								{#each options as optionObj_ (optionObj_.href)}
								<div class="column is-6">
									<a class="button is-primary is-family-secondary is-size-5 is-fullwidth" href={(optionObj_ as Option).href}>
										{(optionObj_ as Option).label}
									</a>
								</div>
								{/each}
					</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>