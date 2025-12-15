<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown'
  let { data } = $props();
</script>
<section class="hero page_title">
  <h3 class="title">{data.title}</h3>
</section>
<section class="section">
    <div class="container">
        <div class="content content_border">
          {#if data.content}
          <SvelteMarkdown options={{mangle: false}} source={data.content}/>
          {/if}
        </div>
    </div>
</section>
