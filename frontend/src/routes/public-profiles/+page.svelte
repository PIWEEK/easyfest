<script>
    import SvelteMarkdown from 'svelte-markdown'
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1>Public Profiles</h1>

{#each data.publicprofiles as publicprofile}

<h2><a href="/public-profiles/{publicprofile.id}">{publicprofile.attributes.fullname}</a></h2>


{#if publicprofile.attributes.title}
   <div><SvelteMarkdown source={publicprofile.attributes.title}/></div>
{/if}

{#if publicprofile.attributes.bio}
    <div><SvelteMarkdown source={publicprofile.attributes.bio}/></div>
{/if}

{/each}
