<script>
  import SvelteMarkdown from 'svelte-markdown'
  export let data;
</script>

<section class="section">
    <div class="container">
        <h1 class="title">FAQs</h1>
        <ul class="list has-hoverable-list-items">
            {#each data.faqs as faq}
                <li class="list-item box">{faq.category} - {faq.order}: {faq.question} = {faq.answer}</li>
            {/each}
        </ul>
    </div>
</section>
