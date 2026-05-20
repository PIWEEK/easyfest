<script lang="ts">
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages.js';
	import ErrorView from '$lib/ErrorView.svelte';

	const errorTitle =
		page.status === 403
			? m.error_403_forbidden()
			: page.status === 404
				? m.error_404_not_found()
				: page.status === 500
					? m.error_500_internal_error()
					: m.error_generic({ status: page.status });

	const errorMessage =
		page.status === 403
			? m.error_403_message()
			: page.status === 404
				? m.error_404_message()
				: page.status === 500
					? m.error_500_message()
					: page.error?.message || m.an_error_has_occurred();
</script>

<ErrorView status={page.status} title={errorTitle} message={errorMessage} />
