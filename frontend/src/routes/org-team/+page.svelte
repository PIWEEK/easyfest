
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

<section class="section">
    <div class="container">
        <h1 class="title">{data.orgcontent.title}</h1>
        <div class="content">
          <SvelteMarkdown options={{mangle: false}} source={data.orgcontent.content}/>
        </div>

        <div class="columns is-multiline">
          {#each data.orgprofiles as publicprofile, i}

              <div class="column is-one-third">
                  <div class="box">
                    <article class="media">
                      <div class="media-left">
                        <figure class="image is-64x64">
                        <img on:click={handleClick(publicprofile)} src="{storage_url}{publicprofile.attributes.photo.data.attributes.url}"/>
                        </figure>
                        </div>  

                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>{publicprofile.attributes.fullname} {#if publicprofile.attributes.nickname}
                              "{publicprofile.attributes.nickname}"
                              {/if}</strong> 
                            <br>
                            <small>{publicprofile.attributes.title}</small>
                          </p>
                        </div>
        
                      </div>

                  </div>
              </div>
          {/each}
        </div>
    </div>
</section>
