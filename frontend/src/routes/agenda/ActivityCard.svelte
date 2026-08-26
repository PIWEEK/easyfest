<script lang="ts">
    import { modals } from 'svelte-modals'

    import ProfileModal from "$lib/ProfileModal.svelte"
    import ActivityModal from "$lib/ActivityModal.svelte"
    import { formatActivityHour } from "$lib/agendaTime.js"

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
        return formatActivityHour(activity.start);
    }

    function hasPublicFaces(activity) {
        return activity.public_faces && activity.public_faces.length > 0;
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
    {#if activity.short_description || hasPublicFaces(activity)}
        <div class="card-content">
            {#if hasPublicFaces(activity)}
                {#each activity.public_faces as pf}
                    <button
                        type="button"
                        class="public-face"
                        aria-label={`Ver perfil de ${pf.fullname}`}
                        onclick={(e) => { e.stopPropagation(); handleProfileClick(pf); }}
                    >
                        <figure class="image is-24x24">
                            <img class="is-rounded" src="{storage_url}{pf.photo.url}" alt=""/>
                        </figure>
                        <span class="public-face__name">
                            {pf.fullname}
                            {#if pf.nickname}
                                "{pf.nickname}"
                            {/if}
                        </span>
                    </button>
                {/each}
            {:else if activity.short_description}
                <p class="short-description">{activity.short_description}</p>
            {/if}

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

    /* Botón de ponente: se distingue claramente de la tarjeta (fondo, borde y
       cursor propios) para que quede claro que es un control aparte, con su
       propio clic, y no parte del texto de la actividad. */
    .public-face {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        margin: 0.5rem 0 0;
        padding: 0.35rem 0.6rem;
        background: rgba(67, 178, 220, 0.12);
        border: 1px solid rgba(13, 59, 68, 0.18);
        border-radius: 999px;
        font: inherit;
        text-align: left;
        cursor: pointer;
        transition:
            background 0.18s ease,
            border-color 0.18s ease;
    }

    .public-face:first-child {
        margin-top: 0;
    }

    .public-face:hover,
    .public-face:focus-visible {
        background: rgba(67, 178, 220, 0.24);
        border-color: rgba(13, 59, 68, 0.32);
    }

    .public-face:focus-visible {
        outline: 2px solid #43b2dc;
        outline-offset: 1px;
    }

    .public-face .image {
        flex-shrink: 0;
    }

    .public-face__name {
        font-size: 0.96rem; /* 20% menos que el tamaño heredado (1.2rem) */
        color: #0d3b44;
        min-width: 0;
        overflow-wrap: break-word;
        word-break: break-word;
    }
</style>
