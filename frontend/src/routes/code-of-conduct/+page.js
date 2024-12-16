import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const codeOfConductData = await fetchSingle("/code-of-conduct");
    if (codeOfConductData) {
        data = codeOfConductData;
    }
    return data;
}
   