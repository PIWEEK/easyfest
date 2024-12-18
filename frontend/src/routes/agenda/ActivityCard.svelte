<script lang="ts">
    import { modals } from 'svelte-modals'

    import Modal from "$lib/ProfileModal.svelte"

    const storage_url = import.meta.env.VITE_STORAGE_URL

   let { activity, height } = $props();

    function handleProfileClick(publicprofile) {
        modals.open(Modal, { profile: publicprofile })
    }

    function activityHour(activity) {
        const start = new Date(activity.attributes.start);
        return start.getHours().toString() + ":" + start.getMinutes().toString();
    }
</script>

<div class="card" style="height: {height}">
    <div class="card-header">
        <p class="card-header-title">
            {activityHour(activity)}
            {activity.attributes.title}
        </p>
   </div>
    {#if activity.attributes.short_description ||
        activity.attributes.public_faces.data.length > 0}
        <div class="card-content">
            {#if activity.attributes.short_description}
                <p class="short-description">{activity.attributes.short_description}</p>
            {/if}

            {#each activity.attributes.public_faces.data as pf}
                {#if activity.attributes.public_faces.data}
                    <block class="public-face media" onclick={handleProfileClick(pf)}>
                        <div class="media-left">
                            <figure class="image is-24x24">
                                <img class="is-rounded" src="{storage_url}{pf.attributes.photo.data.attributes.url}"/>
                            </figure>
                        </div>  
                        <div class="content">
                            {pf.attributes.fullname} 
                            {#if pf.attributes.nickname}
                                "{pf.attributes.nickname}"
                            {/if} 
                        </div>
                    </block>
                 {/if}   
             {/each}

            {#if activity.attributes.tag1 || activity.attributes.tag2}
                <p class="tags is-pulled-right is-pulled-bottom">
                    {#if activity.attributes.tag1}
                        <span class="tag is-primary">{activity.attributes.tag1}</span>
                    {/if}
                    {#if activity.attributes.tag2}
                        <span class="tag is-info">{activity.attributes.tag2}</span>
                    {/if}
                </p>
            {/if}
         </div>
    {/if}
</div>

<style>
    .card {
        margin-bottom: 2rem;
    }

    .tags {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
    }

    .short-description {
        margin-bottom: 0.5rem;
    }

    .card .media {
        margin-bottom: 0;
    }

    .media + .media {
        margin-top: 0.25rem;
        padding-top: 0.25rem;
    }
</style>