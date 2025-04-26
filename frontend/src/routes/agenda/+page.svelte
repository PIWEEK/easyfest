<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import * as m from '$lib/paraglide/messages.js'
    import { writable } from 'svelte/store';

    import ActivityCard from "./ActivityCard.svelte";
    import ActivityFiller from "./ActivityFiller.svelte";

    let { data } = $props();

    // Set this to true to show a compact agenda for debugging
    const debugMode = false;

    let current_day = $state.raw(data.days?.length > 0 ? data.days[0] : null);
    let container = $state();
    let containerWidth = $state();
    let columnsContainer;
    
    function handleDayClick(day) {
        current_day = day;
    }

    function minutesBetween(start, end) {
        if (end > start) {
          return (end - start) / 1000 / 60;
        }
        return 0;
    }

    function startDate(activity) {
        return new Date(activity.start);
    }

    function endDate(activity) {
        return new Date(startDate(activity).getTime() + activity.minutes * 60 * 1000);
    }

    function adjustStartDate(activity) {
        const adjust = activity.adjust_start || 0;
        return new Date(startDate(activity).getTime() - adjust * 60 * 1000);
    }

    // TODO: move this into the database in Strapi
    const compressedIntervals = [
        [new Date("2025-05-08T21:00:00"), new Date("2025-05-08T22:30:00")],
        [new Date("2025-05-09T08:00:00"), new Date("2025-05-09T10:30:00")],
        [new Date("2025-05-09T13:30:00"), new Date("2025-05-09T15:30:00")],
        [new Date("2025-05-09T21:00:00"), new Date("2025-05-09T22:30:00")],
        [new Date("2025-05-10T08:00:00"), new Date("2025-05-10T10:30:00")],
        [new Date("2025-05-10T13:30:00"), new Date("2025-05-10T15:30:00")],
        [new Date("2025-05-10T22:00:00"), new Date("2025-05-11T00:00:00")],
        [new Date("2025-05-11T09:00:00"), new Date("2025-05-11T11:00:00")],
        [new Date("2025-05-11T11:00:00"), new Date("2025-05-11T13:30:00")],
        [new Date("2025-05-11T13:30:00"), new Date("2025-05-11T15:30:00")],
    ];

    /**
     * Calculate the number of minutes between the start and end of an item
     * (an activity or an adjust), but compressing the time located inside
     * any of the compressedIntervals above.
     */
    function compressMinutes(itemStart, itemEnd, factor) {
        let minutes = 0;

        compressedIntervals.forEach(([intervalStart, intervalEnd], i) => {
            const currentStart = (i === 0) ?
                            itemStart :
                            new Date(Math.max(itemStart, compressedIntervals[i-1][1]));
            const currentEnd = (i === (compressedIntervals.length-1)) ?
                            itemEnd :
                            new Date(Math.min(itemEnd, compressedIntervals[i][1]));

            const before = minutesBetween(Math.min(currentStart, intervalStart),
                                          Math.min(intervalStart, currentEnd));
            const during = minutesBetween(Math.max(currentStart, intervalStart),
                                          Math.min(currentEnd, intervalEnd));
            const after = minutesBetween(Math.max(intervalEnd, currentStart),
                                         Math.max(intervalEnd, currentEnd));

            minutes += before + (during / factor) + after;
        });

        return minutes;
    }

    function activityHeight(activity) {
        const minutes = compressMinutes(startDate(activity), endDate(activity), 7);
        return (minutes * 0.3 - 2).toString() + "rem";
    }

    function activityHeightDebug(activity) {
        const minutes = compressMinutes(startDate(activity), endDate(activity), 2, activity);
        return (minutes * 2).toString() + "px";
    }

    function activityAdjust(activity) {
        const minutes = compressMinutes(startDate(activity), adjustStartDate(activity), 7);
        if (minutes !== 0) {
            return (-minutes * 0.3).toString() + "rem";
        }
    }

    function activityAdjustDebug(activity) {
        const minutes = compressMinutes(startDate(activity), adjustStartDate(activity), 2);
        return (-minutes * 2).toString() + "px";
    }

    function handleResize() {
        containerWidth = container.clientWidth;
    }

    onMount(() => {
        if (browser) {
            window.addEventListener('resize', handleResize);
            handleResize();
        }
    });
  
    onDestroy(() => {
        if (browser) {
            window.removeEventListener('resize', handleResize);
        }
    });

    let scrollContainer;
    const showLeftArrow = writable(false);
    const showRightArrow = writable(false);
    const arrowsVisibleOnHover = writable(false);

  function activityHour(activity) {
    const start = new Date(activity.start);
    return `${start.getHours()}:${start.getMinutes().toString().padStart(2, '0')}`;
  }

  function updateArrows() {
    if (scrollContainer && columnsContainer) {
      showLeftArrow.set(scrollContainer.scrollLeft > 0);
      showRightArrow.set(
        columnsContainer.offsetWidth > scrollContainer.clientWidth &&
        scrollContainer.scrollLeft < columnsContainer.offsetWidth - scrollContainer.clientWidth
      );
    } else {
      showLeftArrow.set(false);
      showRightArrow.set(false);
    }
  }
  function handleMouseEnter() {
        arrowsVisibleOnHover.set(true);
    }

    function handleMouseLeave() {
        arrowsVisibleOnHover.set(false);
    }
  onMount(() => {
    if (scrollContainer && columnsContainer) {
      updateArrows(); // Verificar el estado inicial
      scrollContainer.addEventListener('scroll', updateArrows);
      window.addEventListener('resize', updateArrows); // Re-verificar en cambios de tamaño de ventana
    }
  });
  onDestroy(() => {
        if (browser) {
            window.removeEventListener('resize', handleResize);
        }
    });
</script>
<section class="hero page_title">
    <h3 class="title">Horarios</h3>
  </section>
<section class="section agenda-section">
    <div class="container" bind:this={container}>
        <div class="content">
            <div class="tabs is-toggle is-fullwidth">
                <ul>
                    {#each data.days as day}
                        <li class:is-active={day === current_day}>
                            <a onclick={() => handleDayClick(day)}>
                                {m.day()} {day.date} / {day.month + 1}
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>

            {#if debugMode}
              <div style="display: grid; grid-template-columns: repeat(8, 1fr); border: 1px solid black;">
                  {#if current_day}
                      {#each current_day.tracks as track}
                          {#if track.activities.length > 0}
                              <div style="display:flex; flex-direction: column;">
                                  <p style="background-color: var(--bulma-primary); color: white; margin: 0; padding: 8px; font-size: 85%">
                                      {track.title}
                                  </p>
                                  {#each track.activities as activity}
                                      {#if activity.is_filler}
                                          <p style="font-size: 85%; background-color: white; margin: 0; padding: 8px; border: 1px solid grey; height: {activityHeightDebug(activity)}; margin-top: {activityAdjustDebug(activity)};" title="{activity.title}">
                                            {activityHour(activity)} <strong>{activity.minutes}</strong> {activity.title && activity.title.substr(0, 10)}<br />
                                            <span style="font-size: 70%">{compressMinutes(startDate(activity), endDate(activity), 2)}</span>
                                          </p>
                                      {:else}
                                          <p style="font-size: 85%; background-color: rgb(222, 235, 220); margin: 0; padding: 8px; border: 1px solid grey; height: {activityHeightDebug(activity)}; margin-top: {activityAdjustDebug(activity)};" title="{activity.title}">
                                            {activityHour(activity)} <strong>{activity.minutes}</strong> {activity.title.substr(0, 10)}<br />
                                            <span style="font-size: 70%">{compressMinutes(startDate(activity), endDate(activity), 2)}</span>
                                          </p>
                                      {/if}
                                  {/each}
                              </div>
                          {/if}
                      {/each}
                  {/if}
              </div>
            {/if}

            <p class="is-size-7-mobile">Utiliza la rueda de ratón para hacer scroll vertical, y con shift + rueda para scroll horizontal</p>
            <div class="agenda-table" bind:this={scrollContainer}>
                <div class="columns is-1 is-mobile" bind:this={columnsContainer} onmouseenter={handleMouseEnter} onmouseleave={handleMouseLeave}>
                    {#if current_day}
                        {#each current_day.tracks as track}
                            {#if track.activities.length > 0}
                                <div class="column is-half-mobile is-one-quarter-desktop">
                                    <div class="column-header">
                                        <h4 class="title has-text-white is-size-6-mobile">{track.title}</h4>
                                        <p class="subtitle has-text-grey-light is-size-7-mobile">{track.description}</p>
                                    </div>
                                    
                                    {#each track.activities as activity}
                                        {#if activity.is_filler}
                                            <ActivityFiller {activity} height={activityHeight(activity)} adjust={activityAdjust(activity)} hideInMobile={true}/>
                                        {:else}
                                            {#if !activity.is_across_tracks}
                                                <ActivityCard {activity} height={activityHeight(activity)} adjust={activityAdjust(activity)}/>
                                            {:else}
                                                <div class="activity-wrapper">
                                                    <ActivityFiller {activity} height={activityHeight(activity)} adjust={activityAdjust(activity)}/>
                                                    <div class="column-extender" style="width: {containerWidth}px">
                                                        <ActivityCard {activity} height={activityHeight(activity)} adjust={activityAdjust(activity)}/>
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
            <div class="flecha izquierda" class:visible={showLeftArrow} style:opacity={$arrowsVisibleOnHover || $showLeftArrow ? '0.8' : '0.3'}>
                <span class="icon">
                    <i class="fas fa-arrow-left"></i>
                  </span>
            </div>
            <div class="flecha derecha" class:visible={showRightArrow} style:opacity={$arrowsVisibleOnHover || $showRightArrow ? '0.8' : '0.3'}>
                <span class="icon">
                <i class="fas fa-arrow-right"></i>
                </span>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    @use "bulma/sass/layout/container";
    .activity-wrapper {
        position: relative;
    }

    .column-extender {
        position: absolute;
        top: 0;
        left: 0;
        width: container.$container-max-width - container.$container-offset;
    }

    .flecha {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1.2em;
        color: #ccc;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
  
    .izquierda {
        left: 5px;
    }
  
    .derecha {
        right: 5px;
    }
  
    .flecha.visible {
        opacity: 0.8; /* Mantener visibles si es necesario */
    }
</style>
