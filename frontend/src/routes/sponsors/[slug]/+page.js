import { fetchSingle } from '../../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    let data = {}
    const sponsorEntry = await fetchSingle("/sponsors/" + params.slug + "?populate=*");
    if (sponsorEntry) {
        data = {
            sponsor: sponsorEntry
        };
    }
    return data;
}
