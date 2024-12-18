<script>
    import SvelteMarkdown from '@humanspeak/svelte-markdown'
    
    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

{data.faq.attributes.category} - {data.faq.attributes.order}: {data.faq.attributes.question} = {data.faq.attributes.answer}

