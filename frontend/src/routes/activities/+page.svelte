<script>
    import SvelteMarkdown from '@humanspeak/svelte-markdown'
    
    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

<section class="section">
    <div class="container">
        <h1>Activities</h1>

        {#each data.activities as activity}

            <h2>{activity.title}</h2>

            {#if activity.short_description}
                <div class="short">{@html activity.short_description}</div>
            {/if}

            {#if activity.long_description}
                <SvelteMarkdown source={activity.long_description}/>
            {/if}

        {/each}
    </div>
</section>


<style>
    .short {
        font-size: 0.8em;  
    }
    p {
      color: purple;
      font-family: 'Comic Sans MS', cursive;
      font-size: 1em;
    }
</style>