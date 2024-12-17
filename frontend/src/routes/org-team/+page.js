import { fetchSingle, fetchCollection } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
	const [orgTeamEntry, profileEntries] = await Promise.all([
        fetchSingle("/org-team"),
        fetchCollection("/public-profiles?filters[is_org][$eq]=true&populate=*&sort[0]=order:asc"),
    ]);
    if (orgTeamEntry || profileEntries) {
        data = {
            org_team: orgTeamEntry,
            org_profiles: profileEntries,
        };
    }
    return data;
}
