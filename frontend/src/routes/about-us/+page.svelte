<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown'
  let { data } = $props();
</script>
<section class="hero page_title">
  <h3 class="title">{data.title}</h3>
</section>

<section class="section">
    <div class="container">
        <div class="content">
          <div class="columns ">
            <div class="column is-three-fifths">
              {#if data.content}
              <SvelteMarkdown options={{mangle: false}} source={data.content}/>
              {/if}
            </div>
            <div class="column is-flex is-justify-content-flex-end">
              <img class="" src="src/assets/images/Puerta_Hobbit_TRd.webp" alt="puerta hobbit"/>
            </div>
        </div>
    </div>
    
</section>
