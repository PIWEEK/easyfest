<script>
    import { closeModal } from 'svelte-modals'
    import SvelteMarkdown from 'svelte-markdown'   
    export let isOpen
    export let profile
  
  </script>
  
  {#if isOpen}

  <div role="dialog" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{profile.attributes.fullname}
          {#if profile.attributes.nickname}
          "{profile.attributes.nickname}"
          {/if}
       </p>
        <button on:click={closeModal} class="delete" aria-label="close"></button>
      </header>

      <section class="modal-card-body">
        <div class="content">
        <p class="is-italic">
          {#if profile.attributes.title}
          {profile.attributes.title}
          {/if}
        </p>

        {#if profile.attributes.bio}
        <SvelteMarkdown options={{mangle: false}} source={profile.attributes.bio}/>
        {/if}
        {#if profile.attributes.pronouns}
        <p class="tag is-pulled-right">
          {profile.attributes.pronouns}
        </p>
        {/if}

        {#if profile.attributes.is_guest}
        <p class="tag is-dark">Special guest</p>
        {/if}

      </div>
      </section>

     
      <footer class="modal-card-foot">
        {#if profile.attributes.activities}

        {#if profile.attributes.activities.data.length > 0}
        {#each profile.attributes.activities.data as activity}
        <span class="tag">
          
          <a on:click={closeModal} href="/activities/{activity.id}">{activity.attributes.title}</a>
          
        </span>


        {/each}
        {/if}
        {/if}
        <span class="icon is-pulled-right">
          <i class="fa fa-twitter"></i>
        </span>

      </footer>
    </div>

  </div>
  {/if}
  
  <style>
    .modal {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
  
      /* allow click-through to backdrop */
      pointer-events: auto;
    }
  
    .contents {
      min-width: 240px;
      border-radius: 6px;
      padding: 16px;
      background: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      pointer-events: auto;
    }
  
    h2 {
      text-align: center;
      font-size: 24px;
    }
  
    p {
      text-align: center;
      margin-top: 16px;
    }
  
    .actions {
      margin-top: 32px;
      display: flex;
      justify-content: flex-end;
    }
  
  </style>