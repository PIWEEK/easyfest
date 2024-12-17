import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const privacyPolicyEntry = await fetchSingle("/privacy-policy");
    if (privacyPolicyEntry) {
        data = privacyPolicyEntry.attributes;
    }
    return data;
}
   