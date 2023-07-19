<script>
    import SvelteMarkdown from 'svelte-markdown'
    const storage_url = import.meta.env.VITE_STORAGE_URL

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1 class="title">{data.speakerscontent.title}</h1>
<div class="content">
  <SvelteMarkdown options={{mangle: false}} source={data.speakerscontent.content}/>

  <div class="columns">
    {#each data.publicprofiles as publicprofile}

    <div class="column">
    <img src="{storage_url}{publicprofile.attributes.photo.data.attributes.url}"/>


    <a href="/speakers/{publicprofile.id}">{publicprofile.attributes.fullname}</a>
    {#if publicprofile.attributes.nickname}
       ({publicprofile.attributes.nickname})
    {/if}
    
    
    {#if publicprofile.attributes.title}
       <div><SvelteMarkdown source={publicprofile.attributes.title}/></div>
    {/if}
    
    
    </div>
    {/each}
    
  </div>

</div>





