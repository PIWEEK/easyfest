<script>
    import SvelteMarkdown from '@humanspeak/svelte-markdown'
    const storage_url = import.meta.env.VITE_STORAGE_URL

    
    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>


<h2>{data.news_item.title}</h2>
<h3>{data.news_item.summary}</h3>
<SvelteMarkdown source={data.news_item.content}/>
