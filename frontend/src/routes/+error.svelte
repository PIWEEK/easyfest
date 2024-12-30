<script>
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages.js'
</script>

<section class="section">
    <div class="container">
        {#if page.status === 404}
            <h1 class="title">{m.error_404_not_found()}</h1>
            <div class="content">
                <p>{m.error_404_message()}</p>
            </div>
        {:else if page.status === 500}
            <h1 class="title">{m.error_500_internal_error()}</h1>
            <div class="content">
                <p>{m.error_500_message()}</p>
            </div>
        {:else}
            <h1 class="title">{m.error_generic({status:page.status})}</h1>
            {#if page.error.message}
                <div class="content">
                    <p>{page.error.message}</p>
                </div>
            {/if}
        {/if}
    </div>
</section>
