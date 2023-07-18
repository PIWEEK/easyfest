<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1>{data.activity.title}</h1>
<div>{@html data.activity.short_description}</div>
{@html data.activity.long_description}
