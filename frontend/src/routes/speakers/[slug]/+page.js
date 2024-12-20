import { fetchSingle } from '../../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    return await fetchSingle("/public-profiles/" + params.slug + "?populate=*") || {};
}
