<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
  let { data } = $props();
  
    const { form, errors, constraints, message } = superForm(data.form);
</script>

<section class="section">
    <div class="container">
        {#if $message == "success"}
            <img alt="" src="/img/envelope-open.png">
            <h1 class="title is-3 mb-4">Check your email</h1>
            <p class="block">We sent an email to you at {$form.email}</p>
            <p class="block">It has a magic link to log in without a password.</p>
            <p class="block"><a href="/get-link">Get a magic link for another email→</a></p>
        {:else}
            <h1 class="title is-3">Register</h1>
            <p class="block">You need to register to be able to enter the tickets queue and get your tickets.</p>
            <form class="mt-4" method="POST">

                <div class="field block">
                    <label class="label is-sr-only" for="fullname">Full name</label>
                    <div class="control">
                        <input class="input"
                            type="text"
                            name="fullname"
                            placeholder="Enter your name"
                            aria-invalid={$errors.fullname ? 'true' : undefined}
                            bind:value={$form.fullname}
                            {...$constraints.fullname}>
                    </div>
                    {#if $errors.fullname}
                        <p class="help is-danger">{$errors.fullname}</p>
                    {/if}
                </div>

                <div class="field block">
                    <label class="label is-sr-only" for="email">Email</label>
                    <div class="control">
                        <input class="input"
                               type="email"
                               name="email"
                               placeholder="Enter your email"
                               aria-invalid={$errors.email ? 'true' : undefined}
                               bind:value={$form.email}
                               {...$constraints.email}>
                    </div>
                    {#if $errors.email}
                        <p class="help is-danger">{$errors.email}</p>
                    {/if}
                </div>

                <div class="field block">
                    <label class="checkbox">
                        <input type="checkbox"
                            name="accept_code"
                            aria-invalid={$errors.accept_code ? 'true' : undefined}
                            bind:value={$form.accept_code}
                            {...$constraints.accept_code} />
                        I've read and agreed with the <a href="/code-of-conduct" target="_blank">Code of conduct</a>
                    </label>
                    {#if $errors.accept_code}
                        <p class="help is-danger">{$errors.accept_code}</p>
                    {/if}
                </div>

                <div class="field block">
                    <label class="checkbox">
                        <input type="checkbox"
                            name="accept_terms"
                            aria-invalid={$errors.accept_terms ? 'true' : undefined}
                            bind:value={$form.accept_terms}
                            {...$constraints.accept_terms} />
                        I accept the <a href="/privacy-policy" target="_blank">Terms and Conditions</a>
                    </label>
                    {#if $errors.accept_terms}
                        <p class="help is-danger">{$errors.accept_terms}</p>
                    {/if}
                </div>

                <div class="field block mt-6 level buttons is-centered">
                    <div class="control">
                        <button class="button is-primary">Register</button>
                    </div>
                </div>

            </form>
        {/if}
    </div>
</section>