<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

{data.faq.category} - {data.faq.order}: {data.faq.question} = {data.faq.answer}

<style>
    p {
      color: purple;
      font-family: 'Comic Sans MS', cursive;
      font-size: 2em;
    }
</style>