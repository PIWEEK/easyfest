<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown'

  let { data } = $props();

  const rawContent = data.content ?? '';

  // Línea técnica en Strapi:
  // [maps]: https://maps.app.goo.gl/...
  const mapsMarkerMatch = rawContent.match(/^\[maps\]:\s*(https?:\/\/[^\s]+)\s*$/m);

  const mapsUrl =
    mapsMarkerMatch?.[1] ??
    'https://www.google.com/maps/search/?api=1&query=AluaSun+Doblemar+La+Manga+del+Mar+Menor';

  let contentBeforeMap = rawContent;
  let contentAfterMap = '';

  if (mapsMarkerMatch && mapsMarkerMatch.index !== undefined) {
    contentBeforeMap = rawContent.slice(0, mapsMarkerMatch.index).trim();

    contentAfterMap = rawContent
      .slice(mapsMarkerMatch.index + mapsMarkerMatch[0].length)
      .trim();
  }

  // URL embebida para el iframe.
  // Los enlaces cortos maps.app.goo.gl no se pueden usar directamente como iframe.
  const mapsEmbedUrl =
    'https://www.google.com/maps?q=AluaSun%20Doblemar%20La%20Manga%20del%20Mar%20Menor&z=16&output=embed';
</script>

<section class="hero page-title">
  <h3 class="title">{data.title}</h3>
</section>

<section class="section">
    <div class="container">
        <div class="content content-border">
          <div class="columns">
            <div class="column is-five-fifths content-location">
{#if data.content}
  <div class="location-markdown">
    {#if contentBeforeMap}
      <SvelteMarkdown options={{mangle: false}} source={contentBeforeMap}/>
    {/if}

    <div class="map-card">
      <div class="map-card__copy">
        <h4 class="map-card__title">Ubicación del hotel</h4>
        <p class="map-card__text">
          Podéis ampliar, reducir y desplazaros por el mapa. También podéis abrirlo directamente para preparar vuestra ruta.
        </p>

        <a
          class="map-card__button"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir en Google Maps
        </a>
      </div>

      <div class="map-card__frame">
        <iframe
          title="Ubicación del hotel en Google Maps"
          src={mapsEmbedUrl}
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    {#if contentAfterMap}
      <SvelteMarkdown options={{mangle: false}} source={contentAfterMap}/>
    {/if}
  </div>
{/if}
            </div>
          </div>
        </div>
    </div>
</section>

<style>
  .map-card {
    display: grid;
    grid-template-columns: 0.95fr 1.25fr;
    gap: 1.5rem;
    align-items: stretch;
    margin: 2rem 0 2.5rem;
    padding: 1.2rem;
    border-radius: 1.5rem;
    background: linear-gradient(
      135deg,
      rgba(204, 234, 245, 0.85),
      rgba(255, 255, 255, 0.96)
    );
    box-shadow: 0 18px 45px rgba(13, 59, 68, 0.12);
  }

  .map-card__copy {
    padding: 1.2rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .map-card__eyebrow {
    display: inline-block;
    align-self: flex-start;
    margin-bottom: 0.8rem;
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    background: rgba(13, 59, 68, 0.08);
    color: #0d3b44;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .map-card__title {
    margin: 0 0 0.75rem;
    font-size: clamp(1.25rem, 2vw, 1.75rem);
    line-height: 1.2;
    color: #0d3b44;
  }

  .map-card__text {
    margin: 0 0 1.2rem;
    line-height: 1.65;
    color: #23434a;
  }

  .map-card__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    padding: 0.8rem 1.15rem;
    border-radius: 999px;
    background: #0d3b44;
    color: #fff !important;
    text-decoration: none;
    font-weight: 700;
    box-shadow: 0 10px 20px rgba(13, 59, 68, 0.18);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      background 0.2s ease;
  }

  .map-card__button:hover {
    transform: translateY(-2px);
    background: #145665;
    box-shadow: 0 14px 28px rgba(13, 59, 68, 0.22);
  }

  .map-card__frame {
    overflow: hidden;
    border-radius: 1.25rem;
    background: #fff;
    min-height: 340px;
    box-shadow: inset 0 0 0 1px rgba(13, 59, 68, 0.08);
  }

  .map-card__frame iframe {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 340px;
    border: 0;
  }

  /* --- ROSA DE LOS VIENTOS COMO EMBLEMA DE CIERRE --- */

  :global(.location-markdown p:has(img[alt*="rosa"])) {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.2rem;
    margin: 3.5rem auto 1rem;
    text-align: center;
  }

  :global(.location-markdown p:has(img[alt*="rosa"])::before),
  :global(.location-markdown p:has(img[alt*="rosa"])::after) {
    content: "";
    flex: 1;
    max-width: 260px;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(13, 59, 68, 0),
      rgba(176, 107, 45, 0.55),
      rgba(13, 59, 68, 0)
    );
  }

  :global(.location-markdown img[alt*="rosa"]) {
    display: block;
    width: min(145px, 38vw);
    height: auto;
    padding: 0.35rem;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255,255,255,0.95) 0%,
      rgba(255,248,235,0.8) 62%,
      rgba(204,234,245,0.45) 100%
    );
    box-shadow:
      0 12px 28px rgba(13, 59, 68, 0.14),
      0 0 0 1px rgba(176, 107, 45, 0.18);
    filter: sepia(0.08) saturate(1.05);
    transition:
      transform 0.35s ease,
      box-shadow 0.35s ease,
      filter 0.35s ease;
  }

  :global(.location-markdown img[alt*="rosa"]:hover) {
    transform: rotate(12deg) scale(1.06);
    box-shadow:
      0 18px 38px rgba(13, 59, 68, 0.18),
      0 0 0 1px rgba(176, 107, 45, 0.32);
    filter: sepia(0) saturate(1.18);
  }

  :global(.location-markdown p:has(img[alt*="rosa"]) + p) {
    max-width: 640px;
    margin: 0.5rem auto 0;
    text-align: center;
    font-style: italic;
    color: rgba(13, 59, 68, 0.85);
  }

  @media screen and (max-width: 768px) {
    .map-card {
      grid-template-columns: 1fr;
      gap: 1rem;
      padding: 0.9rem;
      border-radius: 1.2rem;
    }

    .map-card__copy {
      padding: 0.5rem 0.25rem 0;
    }

    .map-card__frame,
    .map-card__frame iframe {
      min-height: 300px;
    }

    :global(.location-markdown p:has(img[alt*="rosa"])) {
      gap: 0.75rem;
      margin-top: 2.5rem;
    }

    :global(.location-markdown p:has(img[alt*="rosa"])::before),
    :global(.location-markdown p:has(img[alt*="rosa"])::after) {
      max-width: 90px;
    }

    :global(.location-markdown img[alt*="rosa"]) {
      width: min(120px, 42vw);
    }

    :global(.location-markdown img[alt*="rosa"]:hover) {
      transform: none;
    }
  }
</style>