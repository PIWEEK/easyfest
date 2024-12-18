<script>
  import SvelteMarkdown from 'svelte-markdown'
  const storage_url = import.meta.env.VITE_STORAGE_URL
  
  /**
   * @typedef {Object} Props
   * @property {import('./$types').PageData} data
   */

  /** @type {Props} */
  let { data } = $props();
</script>

<h1>{data.profile.attributes.fullname}</h1>
<div>{data.profile.attributes.title}</div>
<div>Speaker: {data.profile.attributes.is_speaker}</div>
<div>Org: {data.profile.attributes.is_org}</div>
<div>Guest: {data.profile.attributes.is_guest}</div>
<div><img src="{storage_url}{data.profile.attributes.photo.data.attributes.url}"/></div>
<div><SvelteMarkdown source={data.profile.attributes.bio}/></div>

{#each data.profile.attributes.activities.data as a}
  {a.attributes.title}
  {a.attributes.short_description}
{/each}

