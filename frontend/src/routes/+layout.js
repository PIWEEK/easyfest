import { fetchSingle } from '../services/api';

export async function load({}) {
    let data = {}
	const [settingsEntry, siteEntry] = await Promise.all([
        fetchSingle("/setting?populate=*"),
        fetchSingle("/site")
    ]);
    if (settingsEntry || siteEntry) {
        data = {...settingsEntry.attributes, ...siteEntry.attributes}
    }
    return data;
}
