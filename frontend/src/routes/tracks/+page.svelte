<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown'
  let { data } = $props();
</script>

<section class="section">
    <div class="container">
        <h1 class="title">Tracks</h1>

        <ul class="list">
            {#each data.tracks as track}
                <li class="list-item box">{track.title} - {track.description}: {track.location} {track.group}
                    {track.is_title_visible} {track.order}
                </li>
            {/each}
        </ul>
    </div>
</section>
