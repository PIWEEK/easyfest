import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const pressKitEntry = await fetchSingle("/press-kit?populate=*");
    if (pressKitEntry) {
        data = pressKitEntry.attributes;
    }
    return data;
}
   