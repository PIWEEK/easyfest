import { fetchCollection } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const activityEntries = await fetchCollection("/activities?populate=*");
    if (activityEntries) {
        data = {
            activities: activityEntries
        };
    }
    return data;
}
