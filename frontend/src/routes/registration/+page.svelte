<script lang="ts">
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
    const storage_url = import.meta.env.VITE_STORAGE_URL
    /** @type {import('./$types').PageData} */
    export let data;
  
    // Client API:
    const { form, errors, constraints } = superForm(data.form);
</script>
  
<form method="POST">
    <label for="fullname">Full name</label>
    <input
      type="text"
      name="fullname"
      aria-invalid={$errors.fullname ? 'true' : undefined}
      bind:value={$form.fullname}
      {...$constraints.fullname} />
    {#if $errors.fullname}<span class="invalid">{$errors.fullname}</span>{/if}
  
    <label for="email">E-mail</label>
    <input
      type="email"
      name="email"
      aria-invalid={$errors.email ? 'true' : undefined}
      bind:value={$form.email}
      {...$constraints.email} />
    {#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}

    <label for="title">Title</label>
    <input
      type="text"
      name="title"
      aria-invalid={$errors.title ? 'true' : undefined}
      bind:value={$form.title}
      {...$constraints.title} />
    {#if $errors.title}<span class="invalid">{$errors.title}</span>{/if}

    <label for="title">Organization</label>
    <input
      type="text"
      name="organization"
      aria-invalid={$errors.organization ? 'true' : undefined}
      bind:value={$form.organization}
      {...$constraints.organization} />
    {#if $errors.organization}<span class="invalid">{$errors.organization}</span>{/if}
  
    <label for="organization">Pronouns</label>
    <input
      type="text"
      name="pronouns"
      aria-invalid={$errors.pronouns ? 'true' : undefined}
      bind:value={$form.pronouns}
      {...$constraints.pronouns} />
    {#if $errors.pronouns}<span class="invalid">{$errors.pronouns}</span>{/if}


    <div><button>Submit</button></div>
  </form>
  



<ul>
<li>registration: {data.registration}</li>
<li>status: {data.status}</li>
<li>agenda: {data.agenda}</li>

</ul>

<SuperDebug data={$form} />
<style>
    .invalid {
      color: red;
    }
  </style>