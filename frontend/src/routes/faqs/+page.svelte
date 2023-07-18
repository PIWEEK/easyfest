<script>
    /** @type {import('./$types').PageData} */
    export let data;

</script>

<h1>FAQs</h1>

<ul>
{#each data.faqs as faq}
<li>{faq.category} - {faq.order}: {faq.question} = {faq.answer}</li>
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