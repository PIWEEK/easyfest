<script>
    import SvelteMarkdown from 'svelte-markdown'

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1>{data.activity.title}</h1>
<div>{data.activity.short_description}</div>
<SvelteMarkdown source={data.activity.long_description}/>
