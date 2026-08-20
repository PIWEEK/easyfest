<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import * as m from '$lib/paraglide/messages.js';
	let { data } = $props();
	const { form, errors, constraints, message } = superForm(data.form);
</script>

<section class="hero page-title">
	<div class="is-flex is-align-items-center">
		<h3 class="title mb-0 mr-4">{m.login()}</h3>
	</div>
</section>
<section class="section">
	<div class="container">
		<div class="content content-border">
			<div class="columns is-centered">
				<div class="column is-half">
					<div class="card my-5">
						<div class="card-content">
							<h3>¡Bienvenido!</h3>

							<p class="block">{m.enter_your_username_and_password()}</p>
							<form class="mt-4" method="POST">
								<div class="field block">
									<label class="label is-sr-only" for="username">{m.username()}</label>
									<div class="control">
										<input
											class="input"
											type="text"
											name="username"
											placeholder={m.enter_your_username()}
											aria-invalid={$errors.username ? 'true' : undefined}
											bind:value={$form.username}
											{...$constraints.username}
										/>
									</div>
									{#if $errors.username}
										<p class="help is-danger">{$errors.username}</p>
									{/if}
								</div>

								<div class="field block">
									<label class="label is-sr-only" for="password">{m.password()}</label>
									<div class="control">
										<input
											class="input"
											type="password"
											name="password"
											placeholder={m.enter_your_password()}
											aria-invalid={$errors.password ? 'true' : undefined}
											bind:value={$form.password}
											{...$constraints.password}
										/>
									</div>
									{#if $errors.password}
										<p class="help is-danger">{$errors.password}</p>
									{/if}
								</div>

								{#if message}
									<p class="help is-danger">{$message}</p>
								{/if}

								<a class="button is-text" href="/forgot-password">
									{m.forgot_password_press_here()}
								</a>

								<div class="field block mt-6 level buttons is-centered">
									<div class="control">
										<button class="button is-primary">{m.login()}</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Bulma pone la tipografia decorativa de titulos (Cinzel) en los controles
	   de formulario en vez de heredar la del cuerpo (Lora): tanto lo que
	   escribe la persona como el placeholder deben leerse con la tipografia
	   normal del cuerpo. */
	.input {
		font-family: 'Lora', sans-serif;
	}

	.input::placeholder {
		font-family: 'Lora', sans-serif;
	}

	form button.is-primary {
		font-family: 'Cinzel', sans-serif;
	}

	/* Bulma pone white-space:nowrap en .button por defecto: con el texto largo
	   de este enlace se salia de la tarjeta y de la pantalla en movil. */
	.button.is-text {
		height: auto;
		min-height: 2.5em;
		white-space: normal;
		text-align: center;
		line-height: 1.3;
	}
</style>
