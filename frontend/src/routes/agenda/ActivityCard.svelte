<script lang="ts">
    import { modals } from 'svelte-modals'

    import ProfileModal from "$lib/ProfileModal.svelte"
    import ActivityModal from "$lib/ActivityModal.svelte"

    const storage_url = import.meta.env.VITE_STORAGE_URL

    let { activity, height, adjust } = $props();

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
<div class="card {activity.has_own_page ? 'clickable' : ''}" style="height: {height}; margin-top: {adjust}"
     onclick={handleActivityClick} role="button" tabindex="0">
    <div class="card-header">
        <p class="card-header-title">
            {activityHour(activity)} · {activity.title}
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

            {#if activity.tag2}
                <p class="tags is-pulled-right is-pulled-bottom">
                    <span class="tag is-info">{activity.tag2}</span>
                </p>
            {/if}
         </div>
    {/if}
</div>

<style>
    .card {
        margin-bottom: 2rem;
        box-shadow: none;
        /* La altura representa la duración de la actividad y no puede crecer con
           el contenido: cualquier exceso se recorta aquí, nunca se ve fuera de la caja. */
        overflow: hidden;
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    .card-header {
        box-shadow: none;
        flex-shrink: 0;
    }

    .card-header-title {
        font-size: 0.96rem; /* 20% menos que el tamaño heredado (1.2rem) */
        text-align: left;
        /* Bulma pone .card-header-title en display:flex; sin min-width:0 el
           texto, al ser un ítem flex, no se encoge por debajo de su ancho de
           contenido y nunca salta de línea. (flex-shrink:0 haría lo mismo por
           el lado contrario, así que aquí no lo usamos). */
        min-width: 0;
        white-space: normal;
        overflow-wrap: break-word;
        word-break: break-word;
    }

    .card.clickable {
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }

    .card.clickable:hover {
        .card-header {
            transition: all 0.2s ease-in-out;
        }
    }

    .card-content {
        flex: 1 1 auto;
        min-height: 0;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        text-align: left;
        /* Bulma pone 1.5rem de padding en los 4 lados; el hueco con el título
           de arriba queda muy grande, lo reducimos a la mitad solo por arriba. */
        padding-top: 0.75rem;
    }

    .tags {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
    }

    .tags .tag {
        font-size: 0.6rem; /* 20% menos que el tamaño heredado (0.75rem) */
    }

    .short-description {
        font-size: 0.96rem; /* 20% menos que el tamaño heredado (1.2rem) */
        margin-bottom: 0.5rem;
        text-align: left;
        min-width: 0;
        overflow-wrap: break-word;
        word-break: break-word;
    }

    .card .media {
        margin-bottom: 0;
    }

    .media + .media {
        margin-top: 0.25rem;
        padding-top: 0.25rem;
    }

    .public-face .content {
        font-size: 0.96rem; /* 20% menos que el tamaño heredado (1.2rem) */
        text-align: left;
        /* Sin límite de líneas: que use el espacio que haya. .media es flex, así
           que también necesita min-width:0 para poder envolver en vez de
           desbordar (mismo motivo que .card-header-title). El único límite real
           es el overflow:hidden de .card/.card-content si de verdad no cabe. */
        min-width: 0;
        overflow-wrap: break-word;
        word-break: break-word;
    }
</style>
