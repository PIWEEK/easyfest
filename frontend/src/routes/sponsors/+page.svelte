<script lang="ts">
  let { data } = $props();
</script>

<section class="section">
    <div class="container">
        <h1 class="title">Sponsors</h1>
        <ul class="list has-hoverable-list-items">
            {#each data.sponsors as sponsor}
                <li class="list-item box">{sponsor.attributes.level} - {sponsor.attributes.order}: {sponsor.attributes.name} {sponsor.attributes.description}</li>
            {/each}
        </ul>
    </div>
</section>
