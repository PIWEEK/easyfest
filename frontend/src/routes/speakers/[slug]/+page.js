import { fetchSingle } from '../../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    let data = {}
    const profileEntry = await fetchSingle("/public-profiles/" + params.slug + "?populate=*");    
    if (profileEntry) {
        data = {
            profile: profileEntry
        };
    }
    return data;
}
