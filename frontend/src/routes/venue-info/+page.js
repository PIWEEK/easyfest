import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const venueInfoEntry = await fetchSingle("/venue-info");
    if (venueInfoEntry) {
        data = venueInfoEntry.attributes;
    }
    return data;
}
   