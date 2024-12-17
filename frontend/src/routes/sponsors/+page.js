import { fetchCollection } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const sponsorEntries = await fetchCollection("/sponsors?populate=*");
    if (sponsorEntries) {
        data = {
            sponsors: sponsorEntries
        };
    }
    return data;
}
 