<script lang="ts">
	import { ParaglideJS } from '@inlang/paraglide-sveltekit'
	import { i18n } from '$lib/i18n'
	import * as m from '$lib/paraglide/messages.js'

  import "../app.scss"
  import { Modals } from 'svelte-modals'
  import Header from "$lib/Header.svelte"
  import Footer from "$lib/Footer.svelte"

  let { data, children } = $props();

  const title = data.tagline ? `${data.title} | ${data.tagline}` : data.title
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<ParaglideJS {i18n}>
  <Modals>
      {#snippet backdrop( close )}
        <button
            class="backdrop"
            aria-label="{m.close()}"
            onclick={() => close()}
        ></button>
      {/snippet}
  </Modals>

  <Header {data}/>

  {@render children?.()}

  <Footer {data}/>
</ParaglideJS>

<style>
    .backdrop {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: rgba(0,0,0,0.50)
    }
</style>
