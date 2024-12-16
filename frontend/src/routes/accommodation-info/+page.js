import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const accommodationInfoData = await fetchSingle("/accommodation-info");
    if (accommodationInfoData) {
        data = accommodationInfoData;
    }
    return data;
}