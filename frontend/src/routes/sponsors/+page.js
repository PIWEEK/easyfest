import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
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
