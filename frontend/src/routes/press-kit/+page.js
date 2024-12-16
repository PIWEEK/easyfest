import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const pressKitData = await fetchSingle("/press-kit?populate=*");
    if (pressKitData) {
        data = pressKitData;
    }
    return data;
}
   