import { fetchSingle } from '../../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    let data = {}
    const activityEntry = await fetchSingle("/activities/" + params.slug + '?populate=*');    
    if (activityEntry) {
        data = {
            activity: activityEntry
        };
    }
    return data;
}
