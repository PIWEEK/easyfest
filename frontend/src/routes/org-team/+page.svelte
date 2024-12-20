
<script lang="js">
    import SvelteMarkdown from '@humanspeak/svelte-markdown'
    import { modals } from 'svelte-modals'
    import Modal from "$lib/ProfileModal.svelte"
 
    const storage_url = import.meta.env.VITE_STORAGE_URL

    
  /**
   * @typedef {Object} Props
   * @property {import('./$types').PageData} data
   */

  /** @type {Props} */
  let { data } = $props();

  function handleClick(publicprofile) {
    modals.open(Modal, { profile: publicprofile })
  }
</script>

<section class="section">
    <div class="container">
        <h1 class="title">{data.org_team.title}</h1>
        <div class="content">
          {#if data.org_team.content}
          <SvelteMarkdown options={{mangle: false}} source={data.org_team.content}/>
          {/if}
        </div>

        <div class="columns is-multiline">
          {#each data.org_profiles as publicprofile, i}

              <div class="column is-one-third">
                  <div class="box">
                    <article class="media">
                      <div class="media-left">
                        <figure class="image is-64x64">
                        <img onclick={() => handleClick(publicprofile)} src="{storage_url}{publicprofile.photo.url}"/>
                        </figure>
                        </div>  

                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>{publicprofile.fullname} {#if publicprofile.nickname}
                              "{publicprofile.nickname}"
                              {/if}</strong> 
                            <br>
                            <small>{publicprofile.title}</small>
                          </p>
                        </div>
        
                      </div>

                  </div>
              </div>
          {/each}
        </div>
    </div>
</section>
