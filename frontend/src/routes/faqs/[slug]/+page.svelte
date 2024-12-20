<script>
    import SvelteMarkdown from '@humanspeak/svelte-markdown'
    
    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

{data.faq.category} - {data.faq.order}: {data.faq.question} = {data.faq.answer}

