import { fetchSingle } from '../../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    let data = {}
    const newsItemEntry = await fetchSingle("/news-items/" + params.slug + "?populate=*");
    if (newsItemEntry) {
        data = {
            news_item: newsItemEntry
        };
    }
    return data;
}
