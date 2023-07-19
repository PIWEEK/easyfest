<script>
  import SvelteMarkdown from 'svelte-markdown'
  const storage_url = import.meta.env.VITE_STORAGE_URL
  export let data;
</script>

<h1 class="title">{data.title}</h1>
<div class="content">
  <SvelteMarkdown options={{mangle: false}} source={data.content}/>
</div>

<ul class="list">
  {#each data.attachments.data as attachment}
    <li class="list-item box"><a href="{storage_url}{attachment.attributes.url}">{attachment.attributes.caption}</a></li>
  {/each}
</ul>