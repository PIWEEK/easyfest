<script>
    import { onMount, onDestroy } from 'svelte';

    import ActivityCard from "./ActivityCard.svelte";
    import ActivityFiller from "./ActivityFiller.svelte";

    export let data;

    let current_day = data.days?.length > 0 ? data.days[1] : null;
    let container;
    let containerWidth;

    function handleDayClick(day) {
        current_day = day;
    }

    function activityHeight(activity) {
        const duration = activity.attributes.minutes;
        return (duration * 0.6 - 2).toString() + "rem";
    }

    function handleResize() {
        containerWidth = container.clientWidth;
    }

    onMount(() => {
        if (window) {
            window.addEventListener('resize', handleResize);
            handleResize();
        }
    });
  
    // onDestroy(() => {
    //     if (window) {
    //         window.removeEventListener('resize', handleResize);
    //     }
    // });
</script>
  
<section class="section">
    <div class="container" bind:this={container}>
        <div class="tabs is-toggle">
            <ul>
                {#each data.days as day}
                    <li class:is-active={day === current_day}>
                        <a on:click={handleDayClick(day)}>Day {day.date} / {day.month}</a>
                    </li>
                {/each}
            </ul>
        </div>

        <div class="columns">
            {#if current_day}
                {#each current_day.tracks as track}
                    {#if track.activities.length > 0}
                        <div class="column">
                            <h2 class="title is-3">{track.title}</h2>
                            <p class="subtitle">{track.description}</p>
                            {#each track.activities as activity}
                                {#if activity.attributes.is_filler}
                                    <ActivityFiller {activity} height={activityHeight(activity)} hideInMobile={true}/>
                                {:else}
                                    {#if !activity.attributes.is_across_tracks}
                                        <ActivityCard {activity} height={activityHeight(activity)}/>
                                    {:else}
                                        <div class="activity-wrapper">
                                            <ActivityFiller {activity} height={activityHeight(activity)}/>
                                            <div class="column-extender" style="width: {containerWidth}px">
                                                <ActivityCard {activity} height={activityHeight(activity)}/>
                                            </div>
                                        </div>
                                    {/if}
                                {/if}
                            {/each}
                        </div>
                    {/if}
                {/each}
            {/if}
        </div>
    </div>
</section>

<style lang="scss">
    @use "bulma/sass/elements/container.sass";
    .activity-wrapper {
        position: relative;
    }

    .column-extender {
        position: absolute;
        top: 0;
        left: 0;
        width: container.$container-max-width - container.$container-offset;
    }
</style>