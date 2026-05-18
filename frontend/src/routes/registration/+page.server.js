import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const [siteData, registrationInfoData] = await Promise.all([
		fetchSingle('/site'),
		fetchSingle('/registration-info')
	]);

	return {
		fetch_site_data: siteData ?? {},
		fetch_registration_info_data: registrationInfoData ?? {}
	};
}
