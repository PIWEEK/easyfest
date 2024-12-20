import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    return await fetchSingle("/venue-info") || {};
}
   