<script>
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<h1>{data.aboutus.title}</h1>
<p>{@html data.aboutus.content}</p>


<style>
  p {
    color: purple;
    font-family: 'Comic Sans MS', cursive;
    font-size: 2em;
  }
</style>