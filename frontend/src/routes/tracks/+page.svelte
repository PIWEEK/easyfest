<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown'
  let { data } = $props();
</script>

<section class="section">
    <div class="container">
        <h1 class="title">Tracks</h1>

        <ul class="list">
            {#each data.tracks as track}
                <li class="list-item box">{track.attributes.title} - {track.attributes.description}: {track.attributes.location} {track.attributes.group}
                    {track.attributes.is_title_visible} {track.attributes.order}
                </li>
            {/each}
        </ul>
    </div>
</section>
