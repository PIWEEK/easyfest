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
                <p class="is-italic">
                    {#if data.short_description}
                    {data.short_description}
                    {/if}
                </p>

                {#if data.long_description}
                <SvelteMarkdown options={{mangle: false}} source={data.long_description}/>
                {/if}
            </div>
        </div>
            {#if data.tag1 || data.tag2}
                <p class="tags is-pulled-bottom">
                    {#if data.tag1}
                        <span class="tag is-primary">{data.tag1}</span>
                    {/if}
                    {#if data.tag2}
                        <span class="tag is-info">{data.tag2}</span>
                    {/if}
                </p>
            {/if}
    </div>
    
</section>
