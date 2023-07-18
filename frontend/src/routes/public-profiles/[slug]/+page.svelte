<script>
  import SvelteMarkdown from 'svelte-markdown'
  const storage_url = import.meta.env.VITE_STORAGE_URL
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<h1>{data.publicprofile.fullname}</h1>
<div>{data.publicprofile.title}</div>
<div>Speaker: {data.publicprofile.is_speaker}</div>
<div>Org: {data.publicprofile.is_org}</div>
<div>Guest: {data.publicprofile.is_guest}</div>
<div><img src="{storage_url}{data.publicprofile.photo.data.attributes.url}"/></div>
<div><SvelteMarkdown source={data.publicprofile.bio}/></div>

{#each data.publicprofile.activities.data as a}
  {a.attributes.title}
  {a.attributes.short_description}

{/each}


<style>
  p {
    color: purple;
    font-family: 'Comic Sans MS', cursive;
    font-size: 2em;
  }
</style>