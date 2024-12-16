import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const venueInfoData = await fetchSingle("/venue-info");
    if (venueInfoData) {
        data = venueInfoData;
    }
    return data;
}
   