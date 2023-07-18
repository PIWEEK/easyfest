
<script>

const storage_url = import.meta.env.VITE_STORAGE_URL
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<h1 class="title">{data.title}</h1>
<div class="content">{@html data.content}</div>
