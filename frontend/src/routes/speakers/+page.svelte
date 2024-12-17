<script>
    import SvelteMarkdown from 'svelte-markdown'
    import { openModal } from 'svelte-modals'
    import Modal from "$lib/ProfileModal.svelte"

    const storage_url = import.meta.env.VITE_STORAGE_URL

    /** @type {import('./$types').PageData} */
    export let data;

  function handleClick(speaker_profile) {
    openModal(Modal, { profile: speaker_profile })
  }
</script>

<section class="section">
    <div class="container">
        <h1 class="title">{data.speakers.attributes.title}</h1>
        <div class="content">
          {#if data.speakers.attributes.content}
          <SvelteMarkdown options={{mangle: false}} source={data.speakers.attributes.content}/>
          {/if}

          <div class="columns is-multiline">
            {#each data.speaker_profiles as speaker_profile, i}

                <div class="column is-one-quarter">
                    <div class="card">
                        <div class="card-image">
                          <img on:click={handleClick(speaker_profile)} src="{storage_url}{speaker_profile.attributes.photo.data.attributes.url}"/>
                        </div>
                        <div class="card-content">
                            {#if speaker_profile.attributes.is_guest}
                            <p class="tag is-dark">Special guest</p>
                            {/if}


                            <p class="title is-4">{speaker_profile.attributes.fullname}
                    {#if speaker_profile.attributes.nickname}
                    "{speaker_profile.attributes.nickname}"
                    {/if}
                            </p>

                    {#if speaker_profile.attributes.title}
                    <p class="subtitle is-6">{speaker_profile.attributes.title}</p>
                    {/if}
                        </div>

                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
