<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown'
  let { data } = $props();
</script>
<section class="hero page_title">
  <h3 class="title">Preinscripción</h3>
</section>
<section class="section">
    <div class="container">
        <div class="content content_border">

          <div class="columns ">
            <div class="column">
              <img class="" src="src/assets/images/Zanahorias_Hobbit_TR.webp" alt="comida hobbit"/>
            </div>
            <div class="column is-four-fifths">
              <h4>Textos de preinscripcion</h4>
              <p>Aqui irá contenido para la Preinscripción</p>
              <div class="columns is-multiline">
                <div class="column is-6">
                  <a class="button is-primary is-family-secondary is-size-5" href="/hab-individual">Habitación Individual</a>
                </div>
                <div class="column is-6">
                  <a class="button is-primary is-family-secondary is-size-5" href="/hab-doble">Habitación Doble</a>

                </div>
                <div class="column is-6">
                  <a class="button is-primary is-family-secondary is-size-5" href="/hab-triple">Habitación Triple</a>

                </div>
                <div class="column is-6">
                  <a class="button is-primary is-family-secondary is-size-5" href="/hab-aleatoria">Habitación Aleatoria</a>

                </div>
              </div>
            </div>
          </div>
    </div>
</section>
