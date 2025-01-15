<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown'
  const storage_url = import.meta.env.VITE_STORAGE_URL
    let { data } = $props();
</script>
<section class="hero page_title">
  <h3 class="title">{data.title}</h3>
</section>
<section class="section">
    <div class="container">
        <div class="content content-border">
          {#if data.content}
          <SvelteMarkdown options={{mangle: false}} source={data.content}/>
          <!-- <img alt={data.title} src="{storage_url}{data.image.url}"/> -->
          {/if}
        </div>
    </div>
</section>
