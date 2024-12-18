<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown'
  let { data } = $props();
</script>

<section class="section">
    <div class="container">
        <h1 class="title">{data.title}</h1>
        <div class="content">
          {#if data.content}
          <SvelteMarkdown options={{mangle: false}} source={data.content}/>
          {/if}
        </div>
    </div>
</section>
