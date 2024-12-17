import { fetchSingle } from '../../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    let data = {}
    const faqEntry = await fetchSingle("/faqs/" + params.slug);    
    if (faqEntry) {
        data = {
            faq: faqEntry
        };
    }
    return data;
}
