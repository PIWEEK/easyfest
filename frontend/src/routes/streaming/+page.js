import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const streamingData = await fetchSingle("/streaming");
    if (streamingData) {
        data = streamingData;
    }
    return data;
}
   