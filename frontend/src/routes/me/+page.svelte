<script lang="ts">
    import type { PageData } from './$types';
    
    interface Props {
        data: import('./$types').PageData;
    }

    let { data }: Props = $props();
</script>

<section class="section">
    <div class="container">
        {#if data.user}
            <h1 class="title is-3">Your data</h1>
            <p class="block">
                <strong>Your name: </strong>{data.user.username}<br />
                <strong>Your email: </strong>{data.user.email}
            </p>
        {/if}
        {#if data.activities.length > 0}
            <h2 class="title is-4">Activities you participate in:</h2>
            <ul class="list is-hoverable">
            {#each data.activities as activity}
                <li class="list-item">{activity.title}</li>
            {/each}
            </ul>
        {/if}
    </div>
</section>