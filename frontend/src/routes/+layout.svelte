<script>
    import "../app.scss"
    import { Modals, closeModal } from 'svelte-modals'
    import Header from "$lib/Header.svelte"
    import Footer from "$lib/Footer.svelte"

    export let data;

    const title = data.tagline ? `${data.title} | ${data.tagline}` : data.title
</script>

<svelte:head>
  <title>{title}</title>

  {#if import.meta.env.VITE_GTM_CODE}
  <script async src="https://penpot.app/scripts/cookie-consent.js?gtm={import.meta.env.VITE_GTM_CODE}"></script>
  {/if}
</svelte:head>

<Modals>
    <div
      slot="backdrop"
      class="backdrop"
      on:click={closeModal}
    />
</Modals>


<Header {data}/>

<slot></slot>

<Footer {data}/>

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
