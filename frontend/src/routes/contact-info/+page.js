import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const contactInfoData = await fetchSingle("/contact-info");
    if (contactInfoData) {
        data = contactInfoData;
    }
    return data;
}
   
    