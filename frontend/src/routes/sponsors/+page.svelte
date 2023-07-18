<script>
    /** @type {import('./$types').PageData} */
    export let data;

</script>

<h1>Sponsors</h1>

<ul>
{#each data.sponsors as sponsor}
<li>{sponsor.level} - {sponsor.order}: {sponsor.name} {sponsor.description}</li>
{/each}
</ul>

<style>
    .short {
        font-size: 0.8em;  
    }
    p {
      color: purple;
      font-family: 'Comic Sans MS', cursive;
      font-size: 1em;
    }
</style>