<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
	import * as m from '$lib/paraglide/messages.js'
    let { data } = $props();
    const { form, errors, constraints, message } = superForm(data.form);
</script>

<section class="section">
    <div class="container">
        <h1 class="title is-3">{m.login()}</h1>
        <p class="block">{m.enter_your_email_and_password()}</p>
        <form class="mt-4" method="POST">

            <div class="field block">
                <label class="label is-sr-only" for="email">{m.email()}</label>
                <div class="control">
                    <input class="input"
                            type="email"
                            name="email"
                            placeholder="{m.enter_your_email()}"
                            aria-invalid={$errors.email ? 'true' : undefined}
                            bind:value={$form.email}
                            {...$constraints.email}>
                </div>
                {#if $errors.email}
                    <p class="help is-danger">{$errors.email}</p>
                {/if}
            </div>

            <div class="field block">
                <label class="label is-sr-only" for="password">{m.password()}</label>
                <div class="control">
                    <input class="input"
                            type="password"
                            name="password"
                            placeholder="{m.enter_your_password()}"
                            aria-invalid={$errors.password ? 'true' : undefined}
                            bind:value={$form.password}
                            {...$constraints.password}>
                </div>
                {#if $errors.password}
                    <p class="help is-danger">{$errors.password}</p>
                {/if}
            </div>

            {#if message }
                <p class="help is-danger">{$message}</p>
            {/if}

            <div class="field block mt-6 level buttons is-centered">
                <div class="control">
                    <button class="button is-primary">{m.login()}</button>
                </div>
            </div>

        </form>
    </div>
</section>