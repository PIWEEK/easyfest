<script>
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<h1>{data.publicprofile.fullname}</h1>
<div>{@html data.publicprofile.title}</div>
<p>{@html data.publicprofile.bio}</p>


<style>
  p {
    color: purple;
    font-family: 'Comic Sans MS', cursive;
    font-size: 2em;
  }
</style>