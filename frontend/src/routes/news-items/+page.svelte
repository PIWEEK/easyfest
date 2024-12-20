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
            <h3>{news_item.title}</h3>
            <p>{news_item.summary}</p>
            {#if news_item.content}
            <SvelteMarkdown source={news_item.content}/>
            {/if}
            {news_item.date}
            
            {#if news_item.featured_image}
                <img src="{storage_url}{news_item.featured_image.url}"/>
            {/if}
            
            {#if news_item.attachments}
                {#each news_item.attachments as attachment}
                    <a href="{storage_url}{attachment.url}">{storage_url}{attachment.url}</a>
                {/each}
            {/if}

        {/each}
        </ul>
    </div>
</section>
