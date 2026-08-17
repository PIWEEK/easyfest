import { redirect } from '@sveltejs/kit';
import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
	redirect(301, '/estel-tienda');

	const sponsorsInfoEntry = await fetchSingle('/sponsors-info');

	if (sponsorsInfoEntry?.title) {
		sponsorsInfoEntry.title = sponsorsInfoEntry.title.trim();
	}

	return (
		sponsorsInfoEntry ?? {
			title: '',
			content: ''
		}
	);
}
