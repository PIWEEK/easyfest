import { fetchSingle } from '../../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    return await fetchSingle("/faqs/" + params.slug) || {};
}
