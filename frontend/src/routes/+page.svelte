<script>
    const storage_url = import.meta.env.VITE_STORAGE_URL
    /** @type {import('./$types').PageData} */
    export let data;

</script>

<h1>EasyFest</h1>
<h3>Site Settings</h3>
<ul>
<li>title: {data.title}</li>
<li>tagline: {data.tagline}</li>
<li>description: {data.description}</li>
<li>logo_small: {data.logo_small.data.attributes.url}</li>
<li>logo_big: {data.logo_big.data.attributes.url}</li>
<li>backgrounds: {data.backgrounds}</li>
<li>carousel: {data.carousel}</li>
<li>base_url: {data.base_url}</li>
<li>contact: {data.contact}</li>

<img src="{storage_url}{data.logo_small.data.attributes.url}"/>

</ul>
