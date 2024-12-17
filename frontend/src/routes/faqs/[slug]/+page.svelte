<script>
    import SvelteMarkdown from 'svelte-markdown'
    /** @type {import('./$types').PageData} */
    export let data;
</script>

{data.faq.attributes.category} - {data.faq.attributes.order}: {data.faq.attributes.question} = {data.faq.attributes.answer}

