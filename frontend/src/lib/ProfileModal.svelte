<script lang="ts">
    import SvelteMarkdown from '@humanspeak/svelte-markdown'   
  let { isOpen, close, profile } = $props();
  
  </script>
  
  {#if isOpen}

  <div role="dialog" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{profile.fullname}
          {#if profile.nickname}
          "{profile.nickname}"
          {/if}
       </p>
        <button onclick={close} class="delete" aria-label="close"></button>
      </header>

      <section class="modal-card-body">
        <div class="content">
        <p class="is-italic">
          {#if profile.title}
          {profile.title}
          {/if}
        </p>

        {#if profile.bio}
        <SvelteMarkdown options={{mangle: false}} source={profile.bio}/>
        {/if}
        {#if profile.pronouns}
        <p class="tag is-pulled-right">
          {profile.pronouns}
        </p>
        {/if}

        {#if profile.is_guest}
        <p class="tag is-dark">Special guest</p>
        {/if}

      </div>
      </section>

     
      <footer class="modal-card-foot">
        {#if profile.activities}

        {#if profile.activities.length > 0}
        {#each profile.activities as activity}
        <span class="tag">
          
          <a onclick={close} href="/activities/{activity.documentId}">{activity.title}</a>
          
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