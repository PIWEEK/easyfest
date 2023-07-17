<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1>{data.activity.title}</h1>
<div>{@html data.activity.short_description}</div>
<p>{@html data.activity.long_description}</p>


<style>
    p {
      color: purple;
      font-family: 'Comic Sans MS', cursive;
      font-size: 2em;
    }
</style>