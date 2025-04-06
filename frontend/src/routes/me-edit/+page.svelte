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
        <div class="is-flex-grow-1"></div>
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
		<div class="content content_border user_data">
			{#if data.user}
                {#if message }
                    <p class="help is-danger">{$message}</p>
                {/if}
                <form method="POST" id="me-edit">
                    <div class="columns">
                        <div class="column">
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
                                                    <input class="input"
                                                           type="text"
                                                           name="phone_number"
                                                           aria-invalid={$errors.phone_number ? 'true' : undefined}
                                                           bind:value={$form.phone_number}
                                                           {...$constraints.phone_number} />
                                                    {#if $errors.phone_number}
                                                        <p class="help is-danger">{$errors.phone_number}</p>
                                                    {/if}
                                                    <!-- <p class="is-size-5">{data.user.phone_number}</p> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="columns">
                                        <div class="column">
                                            <div class="field">
                                                <label class="label" for="smial">Smial</label>
                                                <div class="control">
                                                    <input class="input"
                                                           type="text"
                                                           name="smial"
                                                           aria-invalid={$errors.smial ? 'true' : undefined}
                                                           bind:value={$form.smial}
                                                           {...$constraints.smial} />
                                                    {#if $errors.smial}
                                                        <p class="help is-danger">{$errors.smial}</p>
                                                    {/if}
                                                    <!-- <p class="is-size-5">{data.user.smial}</p> -->
                                                </div>
                                            </div>
                                        </div>
                                        <div class="column">
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
                                                <label class="label">Código Habitación</label>
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

                        </div>
                        <div class="column">
                            <div class="card">
                                <div class="card-content">
                                    <h3>Menú de gala</h3>
                                    <p>Elige entre estas opciones:</p>
								<p><b>Carne:</b> Carrillera en salsa con guarnición<br>
								<b>Pescado:</b> San Pedro al horno <br>
								<b>Vegano:</b> Tumbet <br>
								</p>
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
                                                      rows="5"
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
                            <div class="card">
                                <div class="card-content">
                                <h3>Otros Datos</h3>
                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label class="label" for="aide">¿Eres escudero?</label>
                                            <div class="control">
                                                <input class="checkbox"
                                                        type="checkbox"
                                                        id="aide"
                                                        name="aide"
                                                        aria-invalid={$errors.aide ? 'true' : undefined}
                                                        bind:checked={$form.aide}
                                                        on:change={() => $form.aide = !!$form.aide}
                                                        {...$constraints.aide} />
                                                    {#if $errors.aide}
                                                        <p class="help is-danger">{$errors.aide}</p>
                                                    {/if}
                                                <!-- <p class="is-size-5">
                                                    {#if data.user.aide}
                                                        Si
                                                    {:else}
                                                        No
                                                    {/if}
                                                </p> -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="field">
                                            <label class="label" for="mentor">¿Eres mentor?</label>
                                            <div class="control">
                                                <input class="checkbox"
                                                        type="checkbox"
                                                        id="mentor"
                                                        name="mentor"
                                                        aria-invalid={$errors.mentor ? 'true' : undefined}
                                                        bind:checked={$form.mentor}
                                                        {...$constraints.mentor} />
                                                    {#if $errors.mentor}
                                                        <p class="help is-danger">{$errors.mentor}</p>
                                                    {/if}
                                                <!-- <p class="is-size-5">
                                                    {#if data.user.mentor}
                                                        Si
                                                    {:else}
                                                        No
                                                    {/if}
                                                </p> -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="field">
                                            <label class="label" for="">¿Estás mentorizado?</label>
                                            <div class="control">
                                                <input class="checkbox"
                                                        type="checkbox"
                                                        id="mentee"
                                                        name="mentee"
                                                        aria-invalid={$errors.mentee ? 'true' : undefined}
                                                        bind:checked={$form.mentee}
                                                        {...$constraints.mentee} />
                                                    {#if $errors.mentee}
                                                        <p class="help is-danger">{$errors.mentee}</p>
                                                    {/if}
                                                <!-- <p class="is-size-5">
                                                    {#if data.user.mentee}
                                                        Si
                                                    {:else}
                                                        No
                                                    {/if}
                                                </p> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <h3>Premium</h3>
                            <div class="columns is-5">
                                <div class="column">
                                    <p>La <b>inscripción Premium</b> incluye la camiseta de la XXIX Mereth Aderthad, diseñada especialmente para conmemorar el Día de Los Portadores por nuestra compañera Gilwen.
                                        <u>La aportación a la inscripción Premium es libre, y por cada 12€ tendrás derecho a una camiseta de obsequio.</u>
                                        Se han creado dos modelos: uno de corte recto y otro de corte entallado. <br>
                                        Indica en observaciones cuántas camisetas quieres y especifica las tallas y modelo, después tendrás que hacer el ingreso del total de las camisetas al número de cuenta <b>IBAN: ES41 2100 4915 6513 0067 0672</b> <u>antes del 15 de Abril</u> con el concepto <b>EC Premium+DNI</b>.
                                        Para cualquier duda escribidnos un e-mail a <a href="mailto:estelcon2025@sociedadtolkien.org">estelcon2025@sociedadtolkien.org</a>
                                        </p>
                                    <div class="field">
                                        <label class="label">¿Quieres camiseta?</label>
                                        <div class="control">
                                            <input class="checkbox"
                                                type="checkbox"
                                                id="premium"
                                                name="premium"
                                                aria-invalid={$errors.premium ? 'true' : undefined}
                                                bind:checked={$form.premium}
                                                {...$constraints.premium} />
                                                {#if $errors.premium}
                                                    <p class="help is-danger">{$errors.premium}</p>
                                                {/if}
                                            <!-- <p class="is-size-5">
                                                {#if data.user.premium}
                                                    Si
                                                {:else}
                                                    No
                                                {/if}	
                                            </p>								 -->
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label" for="premium_comment">Observaciones camiseta (opcional)</label>
                                        <div class="control">
                                            <textarea class="textarea"
                                                      name="premium_comment"
                                                      rows="5"
                                                      placeholder="{m.edit_premium_comment()}"
                                                      aria-invalid={$errors.premium_comment ? 'true' : undefined}
                                                      bind:value={$form.premium_comment}
                                                      {...$constraints.premium_comment}>
                                            </textarea>
                                            {#if $errors.premium_comment}
                                                <p class="help is-danger">{$errors.premium_comment}</p>
                                            {/if}
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="column">
                                    <p>Las tallas y medidas están en las tablas a continuación:</p>
                                    <img src="src/assets/images/chica.jpg" alt="Camisetas chica" class="image" />
                                    <img src="src/assets/images/chico.jpg" alt="Camisetas chico" class="image" />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </form>
			{/if}
		</div>
	</div>
</section>
