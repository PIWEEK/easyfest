import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const cookiePolicyEntry = await fetchSingle("/cookie-policy");
    if (cookiePolicyEntry) {
        data = cookiePolicyEntry.attributes;
    }
    return data;
}
   