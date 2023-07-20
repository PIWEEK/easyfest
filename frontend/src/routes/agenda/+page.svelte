<script>
    import SvelteMarkdown from 'svelte-markdown'
    const storage_url = import.meta.env.VITE_STORAGE_URL
    export let data;
    console.log("data", data)

    let current_day = data.days[1];

    function day_click(day) {
        current_day = day;
    }

    function activity_hour(activity) {
        const start = new Date(activity.attributes.start);
        return start.getHours().toString() + ":" + start.getMinutes().toString();
    }

    function activity_height(activity) {
        const duration = activity.attributes.minutes;
        return (duration * 0.6 - 2).toString() + "rem";
    }
</script>

<div class="container">
    <div class="tabs is-toggle">
        <ul>
            {#each data.days as day}
                <li class:is-active={day === current_day}>
                    <a on:click={day_click(day)}>Day {day.date} / {day.month}</a>
                </li>
            {/each}
        </ul>
    </div>

    <div class="columns">
        {#each current_day.tracks as track}
            <div class="column">
                <h2 class="title is-3">{track.title}</h2>
                {#each track.activities as activity}
                    {#if activity.attributes.is_filler}
                        <div class="filler" style="height: {activity_height(activity)}">
                            &nbsp;
                        </div>
                    {:else}
                        <div class="card" style="height: {activity_height(activity)}">
                            <div class="card-header">
                                <p class="card-header-title">
                                    {activity_hour(activity)}
                                    {activity.attributes.title}
                                </p>
                            </div>
                            {#if activity.attributes.short_description ||
                                activity.attributes.public_faces.data.length > 0}
                                <div class="card-content">
                                    {#if activity.attributes.short_description}
                                        <p>{activity.attributes.short_description}</p>
                                    {/if}

                                    {#each activity.attributes.public_faces.data as pf}
                                        {#if activity.attributes.public_faces.data}
                                            <p>
                                                <a href="/public-profiles/{pf.id}">
                                                    {pf.attributes.fullname}
                                                </a>
                                            </p>
                                        {/if}   
                                    {/each}

                                    {#if activity.attributes.tag1 || activity.attributes.tag2}
                                        <p class="tags">
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
                    {/if}
                {/each}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    @use "bulma/sass/utilities/mixins.sass";

    .card, .filler {
        margin-bottom: 2rem;
    }

    .tags {
        margin-top: 1rem;
    }
    
    @include mixins.mobile {
        .filler {
            display: none;
        }
    }
</style>