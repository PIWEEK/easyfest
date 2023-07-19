<script>
  import SvelteMarkdown from 'svelte-markdown'
  export let data;
</script>

<h1 class="title">Tracks</h1>

<ul class="list">
    {#each data.tracks as track}
        <li class="list-item box">{track.title} - {track.description}: {track.location} {track.group}
            {track.is_title_visible} {track.order}
        </li>
    {/each}
</ul>