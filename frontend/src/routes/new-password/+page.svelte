<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
	import * as m from '$lib/paraglide/messages.js'
    let { data } = $props();
    const { form, errors, constraints, message } = superForm(data.form);
</script>
<section class="hero page-title">
	<div class="is-flex is-align-items-center">
		<h3 class="title mb-0 mr-4">{m.new_password()}</h3>
	</div>
</section>
<section class="section">
    <div class="container">
        <div class="content content-border">
            <div class="columns is-centered">
                <div class="column is-half">
                    <div class="card my-5">
                        <div class="card-content">
                            <h3>{m.new_password()}</h3>
 
                            {#if $message && $message.success }
                                <p class="help is-info">{$message.success}</p>

                                <div class="field block mt-6 level buttons is-centered">
                                    <div class="control">
                                        <a class="button is-info" href="/login">{m.login()}</a>
                                    </div>
                                </div>
                            {:else}
                                <p class="block">{m.enter_your_new_password()}</p>
                                <form class="mt-4" method="POST">
                        
                                    <input type="hidden" name="code"
                                        bind:value={$form.code} />
                        
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
                        
                                    <div class="field block">
                                        <label class="label is-sr-only" for="passwordConfirmation">{m.password()}</label>
                                        <div class="control">
                                            <input class="input"
                                                    type="password"
                                                    name="passwordConfirmation"
                                                    placeholder="{m.enter_your_password_again()}"
                                                    aria-invalid={$errors.passwordConfirmation ? 'true' : undefined}
                                                    bind:value={$form.passwordConfirmation}
                                                    {...$constraints.passwordConfirmation}>
                                        </div>
                                        {#if $errors.passwordConfirmation}
                                            <p class="help is-danger">{$errors.passwordConfirmation}</p>
                                        {/if}
                                    </div>

                                    {#if $message && $message.error }
                                        <p class="help is-danger">{$message.error}</p>
                                    {/if}

                                    <div class="field block mt-6 level buttons is-centered">
                                        <div class="control">
                                            <button class="button is-primary">{m.send()}</button>
                                        </div>
                                    </div>
                    
                                </form>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>