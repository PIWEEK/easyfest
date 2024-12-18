<script>
    import SvelteMarkdown from 'svelte-markdown'

    
    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

<h1>{data.activity.attributes.title}</h1>
<div>{data.activity.attributes.short_description}</div>
{#if data.activity.attributes.long_description}
<SvelteMarkdown options={{mangle: false}} source={data.activity.attributes.long_description}/>
{/if}