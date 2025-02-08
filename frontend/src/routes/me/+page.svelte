<script lang="ts">
    import type { PageData } from './$types';
    import { invalidateAll } from "$app/navigation"
	import * as m from '$lib/paraglide/messages.js'
    
    interface Props {
        data: import('./$types').PageData;
    }

    const logoutClick = () => {
        invalidateAll(); // Makes all components to repaint
    }

    let { data }: Props = $props();
</script>

<section class="section">
    <div class="container">
        <div class="content content_border">
            {#if data.user}
                <h1 class="title is-3">Datos de inscripción</h1>
                <p class="block">
                    <strong>Nombre:</strong> {data.user.username}<br />
                    <strong>Email:</strong> {data.user.email}<br />
                    <strong>Tipo de inscripción:</strong>
                    {#if data.user.registrationType === "full"}
                    Completa
                    {:else if data.user.registrationType === "partial"}
                    Parcial
                    {:else}
                    ?
                    {/if}
                </p>
                <p class="block">
                    <a href="/logout" class="button is-primary" onclick={logoutClick}>
                        {m.logout()}
                    </a>
                </p>
            {/if}
            <!-- {#if data.activities.length > 0}
                <h2 class="title is-4">Activities you participate in:</h2>
                <ul class="list is-hoverable">
                {#each data.activities as activity}
                    <li class="list-item">{activity.title}</li>
                {/each}
                </ul>
            {/if} -->
        </div>
    </div>
</section>