import { fetchSingle } from '../../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    return await fetchSingle("/activities/" + params.documentId) || {};
}