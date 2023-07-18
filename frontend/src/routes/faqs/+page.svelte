<script>
    import SvelteMarkdown from 'svelte-markdown'

    /** @type {import('./$types').PageData} */
    export let data;

</script>

<h1>FAQs</h1>

<ul>
{#each data.faqs as faq}
<li>{faq.category} - {faq.order}: {faq.question} = {faq.answer}</li>
{/each}
</ul>

