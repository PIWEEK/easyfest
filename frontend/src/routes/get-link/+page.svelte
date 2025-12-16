<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
  let { data } = $props();
  
    const { form, errors, constraints, message } = superForm(data.form);
</script>

<section class="section">
    <div class="container">
        {#if $message == "success"}
            <img alt="" src="/img/envelope-open.png">
            <h1 class="title is-3 mb-4">{data.title}</h1>
            <p class="block">We sent an email to you at {$form.email}</p>
            <p class="block">It has a magic link to log in without a password.</p>
            <p class="block"><a href="/get-link">Get a magic link for another email→</a></p>
        {:else}
            <img alt="" src="/img/envelope-closed.png">
            <h1 class="title is-3">{data.title}</h1>
            <p class="block">We will send you an email with your personal code and a magic link to sign in.</p>
            <form class="mt-4" method="POST">

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

                <div class="field block mt-6 level buttons is-centered">
                    <div class="control">
                        <button class="button is-primary">Send me the link</button>
                    </div>
                </div>

            </form>
        {/if}
    </div>
</section>