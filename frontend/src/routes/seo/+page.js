import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {};
    const seoEntry = await fetchSingle("/seo?populate=*");
    if (seoEntry) {
        data = seoEntry.attributes;
    }
    return data;
}
