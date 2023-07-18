<script>
    import SvelteMarkdown from 'svelte-markdown'
    /** @type {import('./$types').PageData} */
    export let data;
</script>

{data.faq.category} - {data.faq.order}: {data.faq.question} = {data.faq.answer}

