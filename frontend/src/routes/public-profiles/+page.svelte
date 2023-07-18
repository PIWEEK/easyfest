<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1>Public Profiles</h1>

{#each data.publicprofiles as publicprofile}

<h2><a data-sveltekit-reload href="/public-profiles/{publicprofile.id}">{publicprofile.attributes.fullname}</a></h2>


{#if publicprofile.attributes.title}
    <div class="short">{@html publicprofile.attributes.title}</div>
{/if}

{#if publicprofile.attributes.bio}
    <p>{@html publicprofile.attributes.bio}</p>
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