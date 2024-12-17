import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const codeOfConductEntry = await fetchSingle("/code-of-conduct");
    if (codeOfConductEntry) {
        data = codeOfConductEntry.attributes;
    }
    return data;
}
   