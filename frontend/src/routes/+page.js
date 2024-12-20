import { encodeQuery, fetchSingle } from '../services/api';

const homepagePath = `/homepage?${encodeQuery({
	populate: '*'
})}`;

const speakersPath = `/public-profiles?${encodeQuery({
	filters: {
		$or: [{ is_guest: { $eq: true } }, { is_speaker: { $eq: true } }]
	},
	populate: '*',
	sort: ['order:asc']
})}`;

const sitePath = `/site?${encodeQuery({
	populate: '*'
})}`;

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	let data = {};

	const [homepageData, speakersData, siteData] = await Promise.all([
		fetchSingle(homepagePath),
		fetchSingle(speakersPath),
		fetchSingle(sitePath)
	]);
	data = {
		homepage: homepageData,
		speakers: speakersData,
		site: siteData,
	};

	return data;
}
