
<script>

const storage_url = import.meta.env.VITE_STORAGE_URL
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<section class="section">
    <div class="container">
      <h1>{data.title}</h1>

      <h2>{data.meta_description}</h2>
        <img src="{storage_url}{data.thumbnail.data.attributes.url}"/>
    </div>
</section>
