import { fetchSingle, fetchCollection } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let data = {}
	const [speakersEntry, profileEntries] = await Promise.all([
        fetchSingle("/speakers"),
        fetchCollection("/public-profiles?filters[$or][0][is_guest][$eq]=true&filters[$or][1][is_speaker][$eq]=true&populate=*&sort[0]=order:asc"),
    ]);
    if (speakersEntry || profileEntries) {
        data = {
            speakers: speakersEntry,
            speaker_profiles: profileEntries,
        };
    }
    return data;
}
