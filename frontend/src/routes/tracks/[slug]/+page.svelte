<script>
    
    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

{data.track.title} - {data.track.description}: {data.track.location}
{data.track.group} {data.track.is_title_visible} {data.track.order}
