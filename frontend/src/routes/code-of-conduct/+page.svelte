<script>
  import SvelteMarkdown from 'svelte-markdown'
  export let data;
</script>

<h1 class="title">{data.title}</h1>
<div class="content">
  <SvelteMarkdown options={{mangle: false}} source={data.content}/>
</div>