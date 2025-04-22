<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
	import * as m from '$lib/paraglide/messages.js'
    import { writable } from 'svelte/store';

    import ActivityCard from "./ActivityCard.svelte";
    import ActivityFiller from "./ActivityFiller.svelte";

    let { data } = $props();

    let current_day = $state.raw(data.days?.length > 0 ? data.days[0] : null);
    let container = $state();
    let containerWidth = $state();
    let columnsContainer;
    
    function handleDayClick(day) {
        current_day = day;
    }

    function activityHeight(activity) {
        const duration = activity.minutes;
        return (duration * 0.5 - 2).toString() + "rem";
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
                                {m.day()} {day.date} / {day.month}
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
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
                                            <ActivityFiller {activity} height={activityHeight(activity)} hideInMobile={true}/>
                                        {:else}
                                            {#if !activity.is_across_tracks}
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