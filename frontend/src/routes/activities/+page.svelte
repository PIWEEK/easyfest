<script>
    import SvelteMarkdown from 'svelte-markdown'
    
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

            <h2>{activity.attributes.title}</h2>

            {#if activity.attributes.short_description}
                <div class="short">{@html activity.attributes.short_description}</div>
            {/if}

            {#if activity.attributes.long_description}
                <SvelteMarkdown source={activity.attributes.long_description}/>
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