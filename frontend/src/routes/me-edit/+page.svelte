<script lang="ts">
	import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
	import * as m from '$lib/paraglide/messages.js';

	interface Props {
		data: import('./$types').PageData;
	}

	let { data }: Props = $props();
    const { form, errors, constraints, message } = superForm(data.form);
</script>

<section class="hero page_title">
	<div class="is-flex is-align-items-center">
		<h3 class="title mb-0 mr-4">Editar Datos de inscripción</h3>
		<a href="/me" class="button is-primary">
			{m.cancel()}
		</a>
        &nbsp;
		<button class="button is-primary" type="submit" form="me-edit">
			{m.send()}
        </button>
	</div>
</section>
<section class="section">
	<div class="container">
		<div class="content content_border">
			{#if data.user}
                {#if message }
                    <p class="help is-danger">{$message}</p>
                {/if}
                <form method="POST" id="me-edit">
                    <div class="columns user_data">
                        <div class="column is-three-fifths">
                            <div class="card">
                                <div class="card-content">
                                    <h3>Datos personales</h3>
                                    <div class="columns">
                                        <div class="column">
                                            <div class="field">
                                                <label class="label">Nombre Usuario</label>
                                                <div class="control">
                                                    <p class="is-size-5">{data.user.username}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="column">
                                            <div class="field">
                                                <label class="label">Email</label>
                                                <div class="control">
                                                    <p class="is-size-5">{data.user.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="columns">
                                        <div class="column">
                                            <div class="field">
                                                <label class="label">Nombre y apellidos</label>
                                                <div class="control">
                                                    <p class="is-size-5">{data.user.name} {data.user.last_name}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="column">
                                            <div class="field">
                                                <label class="label">DNI</label>
                                                <div class="control">
                                                    <p class="is-size-5">{data.user.dni}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="column">
                                            <div class="field">
                                                <label class="label">Teléfono</label>
                                                <div class="control">
                                                    <p class="is-size-5">{data.user.phone_number}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="columns">
                                        <div class="column">
                                            <div class="field">
                                                <label class="label">Smial</label>
                                                <div class="control">
                                                    <p class="is-size-5">{data.user.smial}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="column">
                                            <div class="field">
                                                <label class="label">Pseudónimo</label>
                                                <div class="control">
                                                    <p class="is-size-5">{data.user.pseudonym}</p>
                                                </div>
                                            </div>

                                            <div class="field">
                                                <label class="label" for="pseudonym">Pseudónimo</label>
                                                <div class="control">
                                                    <input class="input"
                                                           type="text"
                                                           name="pseudonym"
                                                           placeholder="{m.edit_pseudonym()}"
                                                           aria-invalid={$errors.pseudonym ? 'true' : undefined}
                                                           bind:value={$form.pseudonym}
                                                           {...$constraints.pseudonym} />
                                                    {#if $errors.pseudonym}
                                                        <p class="help is-danger">{$errors.pseudonym}</p>
                                                    {/if}
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card">
                                <div class="card-content">
                                    <h3>Datos alojamiento</h3>
                                    <div class="columns">
                                        <div class="column">
                                            <div class="field">
                                                <label class="label">Tipo de inscripción</label>
                                                <div class="control">
                                                    <p class="is-size-5">
                                                        {#if data.user.registrationType === 'full'}
                                                            Completa
                                                        {:else if data.user.registrationType === 'partial'}
                                                            Parcial
                                                        {:else}
                                                            ?
                                                        {/if}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="column">
                                            <div class="field">
                                                <label class="label">Tipo de habitación</label>
                                                <div class="control">
                                                    <p class="is-size-5">{data.user.room_type}</p>
                                                </div>
                                            </div>
                                        </div>	
                                        <div class="column">
                                            <div class="field">
                                                <label class="label">Número Habitación</label>
                                                <div class="control">
                                                    <p class="is-size-5">{data.user.room_code}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {#if data.user.childrens}
                                    <div class="columns">
                                        <div class="column">
                                            <div class="field">
                                                <label class="label">Menores a cargo</label>
                                                <div class="control">
                                                    <p class="is-size-5">{data.user.childrens}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/if}
                                </div>
                            </div>

                            <div class="card">
                                    <div class="card-content">
                                    <h3>Otros Datos</h3>
                                    <div class="columns">
                                        <div class="column">
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
                                        </div>
                                        <div class="column">
                                            <div class="field">
                                                <label class="label">¿Eres mentor?</label>
                                                <div class="control">
                                                    <p class="is-size-5">
                                                        {#if data.user.mentor}
                                                            Si
                                                        {:else}
                                                            No
                                                        {/if}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="column">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="card">
                                <div class="card-content">
                                    <h3>Menú de gala</h3>
                                    <div class="field">
                                        <label class="label" for="menu_type">Seleccion de Menú</label>
                                        <div class="control">
                                            <div class="select is-primary">
                                                <select name="menu_type"
                                                        aria-invalid={$errors.menu_type ? 'true' : undefined}
                                                        bind:value={$form.menu_type}
                                                        {...$constraints.menu_type}>
                                                    <option>carne</option>
                                                    <option>pescado</option>
                                                    <option>vegano</option>
                                                </select>
                                            </div>
                                            {#if $errors.menu_type}
                                                <p class="help is-danger">{$errors.menu_type}</p>
                                            {/if}
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label" for="menu_comment">Observaciones al menú</label>
                                        <div class="control">
                                            <textarea class="textarea"
                                                      name="menu_comment"
                                                      rows="10"
                                                      placeholder="{m.edit_menu_options()}"
                                                      aria-invalid={$errors.menu_comment ? 'true' : undefined}
                                                      bind:value={$form.menu_comment}
                                                      {...$constraints.menu_comment}>
                                            </textarea>
                                            {#if $errors.menu_comment}
                                                <p class="help is-danger">{$errors.menu_comment}</p>
                                            {/if}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
			{/if}
		</div>
	</div>
</section>
