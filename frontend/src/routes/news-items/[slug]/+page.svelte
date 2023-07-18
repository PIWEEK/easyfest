<script>
    const storage_url = import.meta.env.VITE_STORAGE_URL

    /** @type {import('./$types').PageData} */
    export let data;
</script>


<h2>{data.news_item.title}</h2>
<h3>{data.news_item.summary}</h3>
{@html data.news_item.content}


<style>
    p {
      color: purple;
      font-family: 'Comic Sans MS', cursive;
      font-size: 2em;
    }
</style>