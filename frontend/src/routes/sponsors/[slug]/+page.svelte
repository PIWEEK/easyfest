<script>
    
    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

{data.sponsor.category} - {data.sponsor.order}: {data.sponsor.question} = {data.sponsor.answer}

