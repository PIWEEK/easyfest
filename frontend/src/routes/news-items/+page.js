import { fetchCollection } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const newsItemEntries = await fetchCollection("/news-items?populate=*");
    if (newsItemEntries) {
        data = {
            news_items: newsItemEntries
        };
    }
    return data;
}
 