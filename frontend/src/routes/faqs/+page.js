import { fetchCollection } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const faqEntries = await fetchCollection("/faqs");
    if (faqEntries) {
        data = {
            faqs: faqEntries
        };
    }
    return data;
}
