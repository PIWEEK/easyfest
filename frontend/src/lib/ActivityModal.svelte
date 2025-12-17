<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown'   
  let { isOpen, close, activity } = $props();
</script>
  
{#if isOpen}

<div role="dialog" class="modal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{activity.title}
     </p>
      <button onclick={close} class="delete" aria-label="close"></button>
    </header>

    <section class="modal-card-body">
      <div class="content">
      <p class="is-italic">
        {#if activity.short_description}
        {activity.short_description}
        {/if}
      </p>

      {#if activity.long_description}
      <SvelteMarkdown options={{mangle: false}} source={activity.long_description}/>
      {/if}
    </div>
    </section>

    <footer class="modal-card-foot">
        {#if activity.tag1 || activity.tag2}
            <p class="tags is-pulled-right is-pulled-bottom">
                {#if activity.tag1}
                    <span class="tag is-primary">{activity.tag1}</span>
                {/if}
                {#if activity.tag2}
                    <span class="tag is-info">{activity.tag2}</span>
                {/if}
            </p>
        {/if}
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
  .modal-card-head{
    align-items: start;
    justify-content: space-between;
  }
  .modal-card-title{
    flex-grow: initial;
    flex-shrink: initial;
  }


  .actions {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
  }

</style>