import { fetchSingle } from '../services/api';

export async function load({}) {
    let data = {}
	const [settingsEntry, siteEntry] = await Promise.all([
        fetchSingle("/setting?populate=*"),
        fetchSingle("/site")
    ]);
    if (settingsEntry || siteEntry) {
        data = {...settingsEntry, ...siteEntry}
    }
    return data;
}
