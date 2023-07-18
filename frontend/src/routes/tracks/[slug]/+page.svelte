<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

{data.track.title} - {data.track.description}: {data.track.location} {data.track.group}
{data.track.is_title_visible} {data.track.order}

<style>
    p {
      color: purple;
      font-family: 'Comic Sans MS', cursive;
      font-size: 2em;
    }
</style>