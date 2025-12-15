import { fetchSingle } from '../../services/api';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    const data = await fetchSingle("/setting");
    if (!data.enrollment_active) {
        error(404);
    }
    return data;
}
