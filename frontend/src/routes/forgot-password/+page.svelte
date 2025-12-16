<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
	import * as m from '$lib/paraglide/messages.js'
    let { data } = $props();
    const { form, errors, constraints, message } = superForm(data.form);
</script>
<section class="hero page-title">
	<div class="is-flex is-align-items-center">
		<h3 class="title mb-0 mr-4">{m.forgot_password()}</h3>
	</div>
</section>
<section class="section">
    <div class="container">
        <div class="content content-border">
            <div class="columns is-centered">
                <div class="column is-half">
                    <div class="card my-5">
                        <div class="card-content">
                            <h3>{m.did_you_forget_password()}</h3>

                            <p class="block">{m.enter_your_email_to_send_you_link()}</p>
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
                    
                                {#if $message && $message.success }
                                    <p class="help is-info">{$message.success}</p>
                                {/if}                    

                                {#if $message && $message.error }
                                    <p class="help is-danger">{$message.error}</p>
                                {/if}
 
                                <div class="field block mt-6 level buttons is-centered">
                                    <div class="control">
                                        <button class="button is-primary">{m.send()}</button>
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