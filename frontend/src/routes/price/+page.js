import { fetchCollection } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const priceEntries = await fetchCollection("/prices?populate=*");
    if (priceEntries) {
        data = {
            prices: priceEntries
        };
    }
    return data;
}