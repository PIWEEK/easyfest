<script>

    const storage_url = import.meta.env.VITE_STORAGE_URL
    /** @type {import('./$types').PageData} */
    export let data;

</script>
<ul>
<li>registration: {data.registration}</li>
<li>status: {data.status}</li>
<li>agenda: {data.agenda}</li>

</ul>

