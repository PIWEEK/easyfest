<script>
    import SvelteMarkdown from 'svelte-markdown'
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1>Speakers</h1>


{#each data.publicprofiles as publicprofile}

<a href="/public-profiles/{publicprofile.id}">{publicprofile.attributes.fullname}</a>


{#if publicprofile.attributes.title}
   <div><SvelteMarkdown source={publicprofile.attributes.title}/></div>
{/if}

{#if publicprofile.attributes.bio}
    <div><SvelteMarkdown source={publicprofile.attributes.bio}/></div>
{/if}

{/each}
