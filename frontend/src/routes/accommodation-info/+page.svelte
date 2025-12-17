<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown'
  let { data } = $props();
</script>
<section class="hero page-title">
  <h3 class="title">{data.title}</h3>
</section>
<section class="section">
    <div class="container">
        <div class="content content-border">
          <div class="columns">
            <div class="column is-three-fifths content-location">
              {#if data.content}
              <SvelteMarkdown options={{mangle: false}} source={data.content}/>
              {/if}
            </div>
          </div>
        </div>
    </div>
</section>
