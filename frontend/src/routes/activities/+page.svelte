<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1>Activities</h1>

{#each data.activities as activity}

<h2>{activity.attributes.title}</h2>

{#if activity.attributes.short_description}
    <div class="short">{@html activity.attributes.short_description}</div>
{/if}

{#if activity.attributes.long_description}
    <p>{@html activity.attributes.long_description}</p>
{/if}

{/each}


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