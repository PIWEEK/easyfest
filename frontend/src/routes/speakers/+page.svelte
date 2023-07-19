<script>
    import SvelteMarkdown from 'svelte-markdown'
    const storage_url = import.meta.env.VITE_STORAGE_URL

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1 class="title">{data.speakerscontent.title}</h1>
<div class="content">
  <SvelteMarkdown options={{mangle: false}} source={data.speakerscontent.content}/>

  <div class="columns is-multiline">
    {#each data.publicprofiles as publicprofile, i}

            <div class="column is-one-quarter">
            <a href="/speakers/{publicprofile.id}"><img src="{storage_url}{publicprofile.attributes.photo.data.attributes.url}"/></a>
            <div>{publicprofile.attributes.fullname}
            {#if publicprofile.attributes.nickname}
            "{publicprofile.attributes.nickname}""
            {/if}
            </div>
    
            {#if publicprofile.attributes.title}
            <div>{publicprofile.attributes.title}</div>
            {/if}

            </div>

 
    {/each}
</div>
  
</div>





