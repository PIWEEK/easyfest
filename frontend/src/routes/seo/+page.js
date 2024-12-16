import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {};
    const seoData = await fetchSingle("/seo?populate=*");
    if (seoData) {
        data = seoData;
    }
    return data;
}
