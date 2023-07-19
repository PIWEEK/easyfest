<script>
    import SvelteMarkdown from 'svelte-markdown'
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1 class="title">{data.speakerscontent.title}</h1>
<div class="content">
  <SvelteMarkdown options={{mangle: false}} source={data.speakerscontent.content}/>

  <div class="columns">
    <div class="column">Auto</div>
    <div class="column">Auto</div>
    <div class="column">Auto</div>
  </div>

</div>





{#each data.publicprofiles as publicprofile}

<a href="/public-profiles/{publicprofile.id}">{publicprofile.attributes.fullname}</a>


{#if publicprofile.attributes.title}
   <div><SvelteMarkdown source={publicprofile.attributes.title}/></div>
{/if}

{#if publicprofile.attributes.bio}
    <div><SvelteMarkdown source={publicprofile.attributes.bio}/></div>
{/if}

{/each}
