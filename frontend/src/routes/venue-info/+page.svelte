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
              <img class="img_mark" src="src/assets/images/hotel_AGHCanet_1.webp" alt="Fotos hotel AGH CANET"/>
              <img class="img_mark" src="src/assets/images/hotel_AGHCanet_2.webp" alt="Fotos hotel AGH CANET"/>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <img class="img_mark" src="src/assets/images/hotel_AGHCanet_3.webp" alt="Fotos hotel AGH CANET"/>
            </div>
            <div class="column">
              <img class="img_mark" src="src/assets/images/hotel_AGHCanet_4.webp" alt="Fotos hotel AGH CANET"/>
            </div>
          </div>
        </div>
    </div>
</section>
