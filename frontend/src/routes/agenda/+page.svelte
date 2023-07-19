<script>
    import SvelteMarkdown from 'svelte-markdown'
    const storage_url = import.meta.env.VITE_STORAGE_URL
    /** @type {import('./$types').PageData} */
    export let data;
</script>

{#each data.tracks as track}
    <div>{track.title} TRACK</div>
        {#each track.activities.data as activity}
           <div>title: {activity.attributes.title}</div>
           <div>abstract: {activity.attributes.short_description}</div>
           <div>start: {activity.attributes.start}</div>
           <div>duration: {activity.attributes.minutes}</div>
           <div>format: {activity.attributes.format}</div>

           {#if activity.attributes.attendees_limit}
           <div>attendees limit: {activity.attributes.attendees_limit}</div>
           {/if}
           
           {#if activity.attributes.needs_registration}
           <div>This activity needs registration</div>
           {/if}

           {#if activity.attributes.has_own_page}
           <div><a href="/activities/{activity.id}">Activity page</a></div>
           {/if}
               {#each activity.attributes.public_faces.data as pf}
               {#if activity.attributes.public_faces.data}
               By:
               <a href="/public-profiles/{pf.id}">{pf.attributes.fullname}</a>
               {/if}   

               {/each}
           <hr/>

           {/each}
{/each}

