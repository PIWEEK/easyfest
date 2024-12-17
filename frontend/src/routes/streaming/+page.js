import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
    const streamingEntry = await fetchSingle("/streaming");
    if (streamingEntry) {
        data = streamingEntry.attributes;
    }
    return data;
}
