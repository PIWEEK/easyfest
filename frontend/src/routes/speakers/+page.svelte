<script>
    import SvelteMarkdown from 'svelte-markdown'
    import { openModal } from 'svelte-modals'
    import Modal from "$lib/ProfileModal.svelte"
 
    const storage_url = import.meta.env.VITE_STORAGE_URL

    /** @type {import('./$types').PageData} */
    export let data;

  function handleClick(publicprofile) {
    openModal(Modal, { profile: publicprofile })
  }


</script>


<h1 class="title">{data.speakerscontent.title}</h1>
<div class="content">
  <SvelteMarkdown options={{mangle: false}} source={data.speakerscontent.content}/>

  <div class="columns is-multiline">
    {#each data.publicprofiles as publicprofile, i}

        <div class="column is-one-third">
            <div class="card">
                <div class="card-image">
                   <img on:click={handleClick(publicprofile)} src="{storage_url}{publicprofile.attributes.photo.data.attributes.url}"/>
                </div>
                <div class="card-content">
                    <p class="title is-4">{publicprofile.attributes.fullname}
            {#if publicprofile.attributes.nickname}
            "{publicprofile.attributes.nickname}"
            {/if}
                    </p>
    
            {#if publicprofile.attributes.title}
            <p class="subtitle is-6">{publicprofile.attributes.title}</p>
            {/if}
                </div>

            </div>
        </div>
    {/each}
</div>
  
</div>

