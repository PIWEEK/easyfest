import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const contactInfoEntry = await fetchSingle("/contact-info");
    if (contactInfoEntry) {
        data = contactInfoEntry.attributes;
    }
    return data;
}
   
    