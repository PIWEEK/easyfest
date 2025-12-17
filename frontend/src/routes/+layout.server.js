import { fetchSingle } from '../services/api';
import { getUserCard } from '../services/users';

export async function load({cookies}) {
    let data = {}
	const [settingsEntry, siteEntry] = await Promise.all([
        fetchSingle("/setting?populate=*", cookies),
        fetchSingle("/site", cookies)
    ]);
    const userCard = getUserCard(cookies);
    if (settingsEntry || siteEntry) {
        data = {...settingsEntry, ...siteEntry, ...userCard}
    }
    return data;
}
