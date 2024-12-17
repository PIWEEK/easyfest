import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const accommodationInfoEntry = await fetchSingle("/accommodation-info");
    if (accommodationInfoEntry) {
        data = accommodationInfoEntry.attributes;
    }
    return data;
}
