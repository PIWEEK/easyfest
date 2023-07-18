<script>
    /** @type {import('./$types').PageData} */
    export let data;

</script>

<h1>Tracks</h1>

<ul>
{#each data.tracks as track}
<li>{track.title} - {track.description}: {track.location} {track.group}
    {track.is_title_visible} {track.order}
</li>
{/each}
</ul>

<style>
    .short {
        font-size: 0.8em;  
    }
    p {
      color: purple;
      font-family: 'Comic Sans MS', cursive;
      font-size: 1em;
    }
</style>