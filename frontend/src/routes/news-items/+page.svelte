<script>
    import SvelteMarkdown from 'svelte-markdown'
    const storage_url = import.meta.env.VITE_STORAGE_URL

    /** @type {import('./$types').PageData} */
    export let data;

</script>

<h1>News items</h1>

<ul>
{#each data.news_items as news_item}
    <h3>{news_item.title}</h3>
    <p>{news_item.summary}</p>
    {#if news_item.content}
    <SvelteMarkdown source={news_item.content}/>
    {/if}
    {news_item.date}
    
    {#if news_item.featured_image.data}
        <img src="{storage_url}{news_item.featured_image.data.attributes.url}"/>
    {/if}
    
    {#if news_item.attachments.data}
        {#each news_item.attachments.data as attachment}
            <a href="{storage_url}{attachment.attributes.url}">{storage_url}{attachment.attributes.url}</a>
        {/each}
    {/if}

{/each}
</ul>

