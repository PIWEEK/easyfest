<script lang="ts">
    interface Props {
        activity: any;
        height: any;
        hideInMobile?: boolean;
    }

    let { activity, height, hideInMobile = false }: Props = $props();
</script>

<div class="filler"
     class:hide-in-mobile={hideInMobile}
     style="height: {height}">
    &nbsp;
</div>

<style lang="scss">
    .filler {
        margin-bottom: 2rem;
    }

    /* No se oculta en móvil: si desaparece, dejaría de ocupar su hueco y las
       tarjetas siguientes se desplazarían hacia arriba, perdiendo la sincronía
       con la guía de horas de la izquierda (que sí cuenta ese hueco). */
</style>