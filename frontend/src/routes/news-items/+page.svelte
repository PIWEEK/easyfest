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

<section class="section">
    <div class="container">
        <h1>News items</h1>

        <ul>
        {#each data.news_items as news_item}
            <h3>{news_item.attributes.title}</h3>
            <p>{news_item.attributes.summary}</p>
            {#if news_item.attributes.content}
            <SvelteMarkdown source={news_item.attributes.content}/>
            {/if}
            {news_item.attributes.date}
            
            {#if news_item.attributes.featured_image.data}
                <img src="{storage_url}{news_item.attributes.featured_image.data.attributes.url}"/>
            {/if}
            
            {#if news_item.attributes.attachments.data}
                {#each news_item.attributes.attachments.data as attachment}
                    <a href="{storage_url}{attachment.attributes.url}">{storage_url}{attachment.attributes.url}</a>
                {/each}
            {/if}

        {/each}
        </ul>
    </div>
</section>
