import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const privacyPolicyData = await fetchSingle("/privacy-policy");
    if (privacyPolicyData) {
        data = privacyPolicyData;
    }
    return data;
}
   