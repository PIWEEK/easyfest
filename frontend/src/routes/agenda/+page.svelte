<script>
    import SvelteMarkdown from 'svelte-markdown'
    const storage_url = import.meta.env.VITE_STORAGE_URL
    export let data;
    console.log("data", data)

    let current_day = data.days[0];

    function day_click(day) {
        current_day = day;
    }

    function activity_hour(activity) {
        const start = new Date(activity.attributes.start);
        return start.getHours().toString() + ":" + start.getMinutes().toString();
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
                    <div class="card">
                        <div class="card-header">
                            <p class="card-header-title">
                                {activity_hour(activity)}
                                {activity.attributes.title}
                            </p>
                        </div>
                        {#if activity.attributes.short_description ||
                             activity.attributes.public_faces.data.lenght > 0}
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
                            </div>
                        {/if}
                    </div>
                    <!-- <div>title: {activity.attributes.title}</div>
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
                    <hr/> -->
                {/each}
            </div>
        {/each}
    </div>
</div>

<style>
    .card {
        margin-bottom: 2rem;
    }
</style>