<script>
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

  function handleClick(speaker_profile) {
    modals.open(Modal, { profile: speaker_profile })
  }
</script>

<section class="section">
    <div class="container">
        <h1 class="title">{data.speakers.title}</h1>
        <div class="content">
          {#if data.speakers.content}
          <SvelteMarkdown options={{mangle: false}} source={data.speakers.content}/>
          {/if}

          <div class="columns is-multiline">
            {#each data.speaker_profiles as speaker_profile, i}

                <div class="column is-one-quarter">
                    <div class="card">
                        <div class="card-image">
                          <img onclick={() => handleClick(speaker_profile)} src="{storage_url}{speaker_profile.photo.url}"/>
                        </div>
                        <div class="card-content">
                            {#if speaker_profile.is_guest}
                            <p class="tag is-dark">Special guest</p>
                            {/if}


                            <p class="title is-4">{speaker_profile.fullname}
                    {#if speaker_profile.nickname}
                    "{speaker_profile.nickname}"
                    {/if}
                            </p>

                    {#if speaker_profile.title}
                    <p class="subtitle is-6">{speaker_profile.title}</p>
                    {/if}
                        </div>

                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
