import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
	const [settingsEntry, siteEntry] = await Promise.all([
        fetchSingle("/setting"),
        fetchSingle("/enrollment")
    ]);
    if (settingsEntry || siteEntry) {
        data = {...settingsEntry, ...siteEntry}
    }
    return data;
}   