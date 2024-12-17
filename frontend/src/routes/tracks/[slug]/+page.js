import { fetchSingle } from '../../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    let data = {}
    const trackEntry = await fetchSingle("/tracks/" + params.slug + "?populate=*");
    if (trackEntry) {
        data = {
            track: trackEntry
        };
    }
    return data;
}
 