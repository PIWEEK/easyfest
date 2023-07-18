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

