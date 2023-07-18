<script>

    import "../app.scss"
    import Header from "$lib/Header.svelte"
    import Footer from "$lib/Footer.svelte"

    export let data;
</script>

<Header {data}/>

<section class="section">
    <div class="container">
        <slot></slot>
    </div>
</section>

<Footer {data}/>