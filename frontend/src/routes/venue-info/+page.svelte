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
            <div class="column is-three-fifths">
              {#if data.content}
              <SvelteMarkdown options={{mangle: false}} source={data.content}/>
              {/if}
            </div>
          </div>
        </div>
    </div>
</section>
