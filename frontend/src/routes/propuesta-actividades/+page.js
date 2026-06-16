import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const pages = await fetchSingle('/simple-pages/?filters[path][$eq]=propuesta-actividades');

	return (
		pages?.[0] ?? {
			title: 'Propuesta de actividades',
			content: ''
		}
	);
}
