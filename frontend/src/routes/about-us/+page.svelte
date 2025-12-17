<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown'
  let { data } = $props();
</script>
<section class="hero page-title">
  <h3 class="title">{data.title}</h3>
</section>

<section class="section">
    <div class="container">
        <div class="content content-border">
          <div class="columns ">
            <div class="column is-three-fifths">
              {#if data.content}
                <SvelteMarkdown options={{mangle: false}} source={data.content}/>
              {/if}
            </div>
            <div class="column is-flex is-justify-content-flex-end">
              {#if data.image}
                <img src={data.image} alt="About us image" />
              {/if}
            </div>
        </div>
    </div>
</section>
