import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const aboutUsData = await fetchSingle("/about-us");
    if (aboutUsData) {
        data = aboutUsData;
    }
    return data;
}
