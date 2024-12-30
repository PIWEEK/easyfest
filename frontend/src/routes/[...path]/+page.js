import { fetchSingle } from '../../services/api';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const pages = await fetchSingle("/simple-pages/?filters[path][$eq]=" + params.path) || {};
    if (pages.length > 0) {
        return pages[0];
    } else {
        error(404);
    }
}
