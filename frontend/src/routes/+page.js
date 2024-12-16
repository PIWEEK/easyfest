import { encodeQuery, fetchSingle } from '../services/api';

const homepagePath = `/homepage?${encodeQuery({
	populate: [
		'hero_image',
		'about_section.image',
		'activities_section.featured_activities.public_faces',
		'activities_section.featured_activities.track',
		'speakers_section',
		'locations_section.locations.image',
		'accommodation_section.places.image'
	]
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
