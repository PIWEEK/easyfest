<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown'
  const storage_url = import.meta.env.VITE_STORAGE_URL
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

        {#if data.attachments.length > 0}
        <ul class="list">
          {#each data.attachments as attachment}
            <li class="list-item box"><a href="{storage_url}{attachment.url}">{attachment.caption ?? 'Media resource'}</a></li>
          {/each}
        </ul>
        {/if}
    </div>
</section>
