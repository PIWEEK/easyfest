import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const cookiePolicyData = await fetchSingle("/cookie-policy");
    if (cookiePolicyData) {
        data = cookiePolicyData;
    }
    return data;
}
   