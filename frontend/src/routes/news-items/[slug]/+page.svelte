<script>
    import SvelteMarkdown from 'svelte-markdown'
    const storage_url = import.meta.env.VITE_STORAGE_URL

    /** @type {import('./$types').PageData} */
    export let data;
</script>


<h2>{data.news_item.attributes.title}</h2>
<h3>{data.news_item.attributes.summary}</h3>
<SvelteMarkdown source={data.news_item.attributes.content}/>
