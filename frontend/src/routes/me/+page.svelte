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
                <div class="is-flex is-justify-content-space-between is-align-items-flex-start">
                    <h1 class="title">Datos de inscripción</h1>
                    <a href="/logout" class="button is-primary" onclick={logoutClick}>
                        {m.logout()}
                    </a>
                </div>
                <div class="content">
                    <div class="field">
                      <label class="label">Nombre Usuario</label>
                      <div class="control">
                        <p class="is-size-5">{data.user.username}</p>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Email</label>
                      <div class="control">
                        <p class="is-size-5">{data.user.email}</p>
                      </div>
                    </div>
                </div>

                <div class="content">
                    <h3>Datos personales</h3>
                    <div class="field">
                      <label class="label">Nombre y apellidos</label>
                      <div class="control">
                        <p class="is-size-5">{data.user.name}{data.user.last_name}</p>
                      </div>
                    </div>
                    <div class="field">
                        <label class="label">Teléfono</label>
                        <div class="control">
                          <p class="is-size-5">{data.user.phone_number}</p>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">DNI</label>
                        <div class="control">
                          <p class="is-size-5">{data.user.dni}</p>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Smial</label>
                        <div class="control">
                          <p class="is-size-5">{data.user.smial}</p>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Pseudónimo</label>
                        <div class="control">
                          <p class="is-size-5">{data.user.pseudonym}</p>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <h3>Datos alojamiento</h3>
                    <div class="field">
                        <label class="label">Tipo de inscripción</label>
                        <div class="control">
                          <p class="is-size-5">{#if data.user.registrationType === "full"}
                              Completa
                              {:else if data.user.registrationType === "partial"}
                              Parcial
                              {:else}
                              ?
                              {/if}</p>
                        </div>
                      </div>
                    <div class="field">
                      <label class="label">Tipo Habitación</label>
                      <div class="control">
                        <p class="is-size-5">{data.user.room_type}</p>
                      </div>
                    </div>
                    <div class="field">
                        <label class="label">Número Habitación</label>
                        <div class="control">
                          <p class="is-size-5">{data.user.room_code}</p>
                        </div>
                      </div>
                </div>
                <div class="content">
                    <h3>Otros Datos</h3>
                    <div class="field">
                        <label class="label">¿Eres escudero?</label>
                        <div class="control">
                          <p class="is-size-5">
                            {#if data.user.aide}
                            Si
                            {:else}
                            No
                            {/if}
                            </p>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">¿Eres mentor?</label>
                        <div class="control">
                          <p class="is-size-5">
                            <p class="is-size-5">
                                {#if data.user.mentor}
                                Si
                                {:else}
                                No
                                {/if}
                            </p>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">¿Estás mentorizado?</label>
                        <div class="control">
                          <p class="is-size-5">
                            {#if data.user.mentee}
                                Si
                                {:else}
                                No
                                {/if}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <h3>Menú de gala</h3>
                    <div class="field">
                        <label class="label">Seleccion de Menú</label>
                        <div class="control">
                          <p class="is-size-5">{data.user.menu_type}</p>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Observaciones al menú</label>
                        <div class="control">
                          <p class="is-size-5">{data.user.menu_comment}</p>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <h3>Extras</h3>
                    Aquí seleccionaremos los extras, como por ejemplo de momento las camisetas:
                    <div class="field">
                        <label class="label">¿Quieres camiseta?</label>
                        <div class="control">
                          aqui tiene que ir un select de si no, y en funcion de eso, q aparezca el campo de observaciones
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Observaciones camiseta (opcional)</label>
                        <div class="control">
                          <p class="is-size-5">{data.user.premium_comment}</p>
                        </div>
                    </div>
                </div>
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