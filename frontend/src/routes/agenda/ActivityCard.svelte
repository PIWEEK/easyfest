<script lang="ts">
    import { modals } from 'svelte-modals'

    import ProfileModal from "$lib/ProfileModal.svelte"
    import ActivityModal from "$lib/ActivityModal.svelte"

    const storage_url = import.meta.env.VITE_STORAGE_URL

    let { activity, height } = $props();

    function handleActivityClick() {
        if (activity.has_own_page) {
            modals.open(ActivityModal, { activity })
        }
    }

    function handleProfileClick(publicprofile) {
        modals.open(ProfileModal, { profile: publicprofile })
    }

    function activityHour(activity) {
        const start = new Date(activity.start);
        return `${start.getHours()}:${start.getMinutes().toString().padStart(2, '0')}`;
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="card {activity.has_own_page ? 'clickable' : ''}" style="height: {height}"
     onclick={handleActivityClick} role="button" tabindex="0">
    <div class="card-header">
        <p class="card-header-title">
            {activityHour(activity)}
            {activity.title}
        </p>
   </div>
    {#if activity.short_description || (activity.public_faces && activity.public_faces.length > 0)}
        <div class="card-content">
            {#if activity.short_description}
                <p class="short-description">{activity.short_description}</p>
            {/if}

            {#each activity.public_faces as pf}
                {#if activity.public_faces}
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <block class="public-face media" onclick={() => handleProfileClick(pf)}>
                        <div class="media-left">
                            <figure class="image is-24x24">
                                <img class="is-rounded" src="{storage_url}{pf.photo.url}"/>
                            </figure>
                        </div>  
                        <div class="content">
                            {pf.fullname} 
                            {#if pf.nickname}
                                "{pf.nickname}"
                            {/if} 
                        </div>
                    </block>
                 {/if}   
             {/each}

            {#if activity.tag1 || activity.tag2}
                <p class="tags is-pulled-right is-pulled-bottom">
                    {#if activity.tag1}
                        <span class="tag is-primary">{activity.tag1}</span>
                    {/if}
                    {#if activity.tag2}
                        <span class="tag is-info">{activity.tag2}</span>
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

    .card.clickable {
        cursor: pointer;
    }

    .card.clickable:hover {
        background-color: var(--bulma-gray-light);
        .card-header {
            background-color: var(--bulma-primary);
        }
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