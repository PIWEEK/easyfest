<script>
  import SvelteMarkdown from '@humanspeak/svelte-markdown'
  const storage_url = import.meta.env.VITE_STORAGE_URL
  
  /**
   * @typedef {Object} Props
   * @property {import('./$types').PageData} data
   */

  /** @type {Props} */
  let { data } = $props();
</script>

<h1>{data.profile.fullname}</h1>
<div>{data.profile.title}</div>
<div>Speaker: {data.profile.is_speaker}</div>
<div>Org: {data.profile.is_org}</div>
<div>Guest: {data.profile.is_guest}</div>
<div><img src="{storage_url}{data.profile.photo.url}"/></div>
<div><SvelteMarkdown source={data.profile.bio}/></div>

{#each data.profile.activities as a}
  {a.title}
  {a.short_description}
{/each}

