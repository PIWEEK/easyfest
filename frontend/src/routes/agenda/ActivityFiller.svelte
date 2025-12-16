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
    @use "bulma/sass/utilities/mixins";

    .filler {
        margin-bottom: 2rem;
    }
    
    @include mixins.mobile {
        .filler.hide-in-mobile {
            display: none;
        }
    }
</style>