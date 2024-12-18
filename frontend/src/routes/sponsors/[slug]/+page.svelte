<script>
    
    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

{data.sponsor.attributes.category} - {data.sponsor.attributes.order}: {data.sponsor.attributes.question} = {data.sponsor.attributes.answer}

