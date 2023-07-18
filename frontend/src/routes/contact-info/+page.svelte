
<script>
  import SvelteMarkdown from 'svelte-markdown'

  const storage_url = import.meta.env.VITE_STORAGE_URL
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<h1>{data.title}</h1>
<SvelteMarkdown source={data.content}/>

