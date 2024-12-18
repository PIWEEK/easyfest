<script>
  const storage_url = import.meta.env.VITE_STORAGE_URL
  
  /**
   * @typedef {Object} Props
   * @property {import('./$types').PageData} data
   */

  /** @type {Props} */
  let { data } = $props();
</script>

<section class="section">
  <div class="container">
    {#if data.title}
      <h1>{data.title}</h1>
    {/if}
    {#if data.meta_description}
      <h2>{data.meta_description}</h2>
    {/if}
    {#if data.thumbnail.data}
      <img src="{storage_url}{data.thumbnail.data.attributes.url}"/>
    {/if}
  </div>
</section>
