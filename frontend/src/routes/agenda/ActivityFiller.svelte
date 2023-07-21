<script>
    export let activity;
    export let height;
    export let hideInMobile = false;
</script>

<div class="filler"
     class:hide-in-mobile={hideInMobile}
     style="height: {height}">
    &nbsp;
</div>

<style lang="scss">
    @use "bulma/sass/utilities/mixins.sass";

    .filler {
        margin-bottom: 2rem;
    }
    
    @include mixins.mobile {
        .filler.hide-in-mobile {
            display: none;
        }
    }
</style>