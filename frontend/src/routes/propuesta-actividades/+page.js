import { error } from '@sveltejs/kit';
import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const pages = await fetchSingle('/simple-pages/?filters[path][$eq]=propuesta-actividades');
	const page = pages?.[0];

	if (!page?.content) {
		error(404, 'Página no disponible');
	}

	return page;
}
