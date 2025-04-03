<script lang="ts">
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages.js';

	interface Props {
		data: import('./$types').PageData;
	}

	let { data }: Props = $props();
</script>

<section class="hero page_title">
	<div class="is-flex is-align-items-center">
		<h3 class="title mb-0 mr-4">Datos de inscripción</h3>
		<a href="/me-edit" class="button is-primary">
			<span class="icon-text">
				<span class="icon"><i class="fas fa-edit"></i></span>
				<span>{m.edit()}</span>
			</span>
		</a>
		<span class="is-flex-grow-1"></span>
		<a href="/logout" data-sveltekit-reload class="button is-secondary">
			<span class="icon-text">
				<span class="icon"><i class="fas fa-sign-out-alt"></i></span>
				<span>{m.logout()}</span>
			</span>
		</a>
	</div>
</section>
<section class="section">
	<div class="container">
		<div class="content content_border user_data">
			{#if data.user}
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
									<label class="label">Menú seleccionado</label>
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
										<p class="is-size-5">
									{#if data.user.premium}
										Si
									{:else}
										No
									{/if}	
									</p>								
									</div>
								</div>
								<div class="field">
									<label class="label">Observaciones camiseta (opcional)</label>
									<div class="control">
										<p class="is-size-5">{data.user.premium_comment}</p>
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
