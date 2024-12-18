<script>
    
    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

{data.track.attributes.title} - {data.track.attributes.description}: {data.track.attributes.location}
{data.track.attributes.group} {data.track.attributes.is_title_visible} {data.track.attributes.order}
