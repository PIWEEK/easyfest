import { fetchSingle } from '../services/api';

export async function load({}) {
    let data = {}
	const [settingsData, siteData] = await Promise.all([
        fetchSingle("/setting?populate=*"),
        fetchSingle("/site")
    ]);
    if (settingsData && siteData) {
        data = {...settingsData, ...siteData}
    }
    return data;
}
