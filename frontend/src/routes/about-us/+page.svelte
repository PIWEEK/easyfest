<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown'
  let { data } = $props();
</script>

<section class="section">
    <div class="container">
        <h3 class="title">{data.title}</h3>
        <div class="content">
          {#if data.content}
          <SvelteMarkdown options={{mangle: false}} source={data.content}/>
          {/if}
        </div>
    </div>
</section>
