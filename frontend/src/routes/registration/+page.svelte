<script lang="ts">
    import SvelteMarkdown from '@humanspeak/svelte-markdown'
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
    
  interface Props {
    data: import('./$types').PageData;
  }

  let { data }: Props = $props();
  
    const { form, errors, constraints } = superForm(data.form);
</script>

<section class="section">
    <div class="container">
        <div class="content is-normal">
            {#if data.fetch_registration_info_data.content}
            {data.fetch_registration_info_data.content}
            {/if}
        </div>

        {#if data.fetch_site_data.registration == "soon"}

        <div class="content is-normal">
          <SvelteMarkdown options={{mangle: false}} source={data.fetch_registration_info_data.content_soon ?? ''}/>
        </div>
        {/if}

        {#if data.fetch_site_data.registration == "open"}
            <div>
              <SvelteMarkdown options={{mangle: false}} source={data.fetch_registration_info_data.content_open ?? ''}/>
            </div>
        {/if}

        {#if data.fetch_site_data.registration == "finished"}
            <div>
              <SvelteMarkdown options={{mangle: false}} source={data.fetch_registration_info_data.content_closed ?? ''}/>
            </div>
        {/if}

        {#if data.fetch_site_data.registration == "open"}
          <form class="box" method="POST">
              <div class="field">
                  <label class="label" for="fullname">Full name</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input" type="text" name="fullname" aria-invalid={$errors.fullname ? 'true' : undefined}
                    bind:value={$form.fullname}
                    {...$constraints.fullname}>
                  </div>
                  {#if $errors.fullname}
                      <p class="help is-danger">{$errors.fullname}</p>{/if}
              </div>

              <div class="field">
                  <label class="label" for="email">Email</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input" type="email" name="email" aria-invalid={$errors.email ? 'true' : undefined}
                    bind:value={$form.email}
                    {...$constraints.email}>
                  </div>
                  {#if $errors.email}
                      <p class="help is-danger">{$errors.email}</p>{/if}
              </div>

              <div class="field">
                  <label class="label" for="title">Title</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input" type="text" name="title" aria-invalid={$errors.title ? 'true' : undefined}
                    bind:value={$form.title}
                    {...$constraints.title}>
                  </div>
                  {#if $errors.title}
                      <p class="help is-danger">{$errors.title}</p>{/if}
              </div>
          
              <div class="field">
                  <label class="label" for="organization">Organization</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input" type="text" name="organization" aria-invalid={$errors.organization ? 'true' : undefined}
                    bind:value={$form.organization}
                    {...$constraints.organization}>
                  </div>
                  {#if $errors.organization}
                      <p class="help is-danger">{$errors.organization}</p>{/if}
              </div>

              <div class="field">
                  <label class="label" for="pronouns">Pronouns</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input" type="text" name="pronouns" aria-invalid={$errors.pronouns ? 'true' : undefined}
                    bind:value={$form.pronouns}
                    {...$constraints.pronouns}>
                  </div>
                  {#if $errors.pronouns}
                      <p class="help is-danger">{$errors.pronouns}</p>{/if}
              </div>
              <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-link">Submit</button>
                  </div>
              </div>
          </form>
        {/if}
    </div>
</section>

<style>
  form {
    margin-top: 1rem;
  }
</style>