<script>
    import SvelteMarkdown from '@humanspeak/svelte-markdown'
    import * as m from '$lib/paraglide/messages.js'
  /**
   * @typedef {Object} Props
   * @property {import('./$types').PageData} data
   */

  /** @type {Props} */
  let { data } = $props();
</script>
<section class="hero page-title">
	<h3 class="title">{m.streaming()}</h3>
</section>
<section class="section">
    <div class="container">
        <div class="content content-border">
          {#if data.content}
          <SvelteMarkdown options={{mangle: false}} source={data.content}/>
          {/if}
        </div>
    </div>
</section>
