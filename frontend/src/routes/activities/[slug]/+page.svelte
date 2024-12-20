<script>
    import SvelteMarkdown from '@humanspeak/svelte-markdown'

    
    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

<h1>{data.title}</h1>
<div>{data.short_description}</div>
{#if data.long_description}
<SvelteMarkdown options={{mangle: false}} source={data.long_description}/>
{/if}