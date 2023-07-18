
<script>

const storage_url = import.meta.env.VITE_STORAGE_URL
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<h1>{data.meta_description}</h1>
{data.tagline}
<img src="{storage_url}{data.thumbnail.data.attributes.url}"/>

<!-- to be replaced by the missing css toolkit -->
<style>
  h1 {
    color: purple;
    font-family: 'Comic Sans MS', cursive;
    font-size: 2em;
  }
</style>