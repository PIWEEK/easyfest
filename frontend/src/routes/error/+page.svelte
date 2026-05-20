<script lang="ts">
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages.js';
	import ErrorView from '$lib/ErrorView.svelte';

	const rawStatus = page.url.searchParams.get('status');
	const status = Number(rawStatus || 404);
	const customMessage = page.url.searchParams.get('message');

	const errorTitle =
		status === 403
			? m.error_403_forbidden()
			: status === 404
				? m.error_404_not_found()
				: status === 500
					? m.error_500_internal_error()
					: m.error_generic({ status });

	const errorMessage =
		customMessage ||
		(status === 403
			? m.error_403_message()
			: status === 404
				? m.error_404_message()
				: status === 500
					? m.error_500_message()
					: m.an_error_has_occurred());
</script>

<ErrorView {status} title={errorTitle} message={errorMessage} />
