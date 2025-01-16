<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown'
  let { data } = $props();
</script>
<section class="hero page_title">
  <h3 class="title">{data.title}</h3>
</section>
<section class="section">
    <div class="container">
        <div class="content content_border">
          <div class="columns">
            <div class="column is-three-fifths">
              {#if data.content}
              <SvelteMarkdown options={{mangle: false}} source={data.content}/>
              {/if}
            </div>
            <div class="column">
              <iframe title="Como llegar al hotel AGH Canet" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.3140144301437!2d-0.20844012339926477!3d39.68090427156738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6016632abcc2d7%3A0x736d96ceb9648b8a!2sHotel%20AGH%20Canet!5e1!3m2!1ses!2ses!4v1736940307873!5m2!1ses!2ses" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
    </div>
</section>
