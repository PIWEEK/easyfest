import { fetchCollection } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const trackEntries = await fetchCollection("/tracks?populate=*");
    if (trackEntries) {
        data = {
            tracks: trackEntries
        };
    }
    return data;
}
 