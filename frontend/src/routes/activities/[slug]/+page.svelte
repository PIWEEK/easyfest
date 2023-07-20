<script>
    import SvelteMarkdown from 'svelte-markdown'

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1>{data.activity.title}</h1>
<div>{data.activity.short_description}</div>
{#if data.activity.long_description}
<SvelteMarkdown options={{mangle: false}} source={data.activity.long_description}/>
{/if}