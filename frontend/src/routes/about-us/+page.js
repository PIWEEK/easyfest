import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const aboutUsEntry = await fetchSingle("/about-us");
    if (aboutUsEntry) {
        data = aboutUsEntry.attributes;
    }
    return data;
}
