<script>
  import SvelteMarkdown from 'svelte-markdown'
  export let data;
</script>

<h1 class="title">{data.title}</h1>
<div class="content">
  <SvelteMarkdown options={{mangle: false}} source={data.content}/>
</div>

<ul class="list">
  {#each data.attachments.data as attachment}
    <li class="list-item box"><a href="{storage_url}{attachment.attributes.url}">{attachment.attributes.url}</a></li>
  {/each}
</ul>