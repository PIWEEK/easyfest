import axios from 'axios';
import qs from 'qs';

/** @type {(query: object) => string} */
const encodeQuery = (query) =>
	qs.stringify(query, {
		encodeValuesOnly: true // prettify URL
	});

const base = import.meta.env.VITE_API_URL;
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

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	let data = {};
	let content = null;
	let error = null;

	try {
		const [homepageRes, speakersRes] = await Promise.all([
			axios(base + homepagePath),
			axios(base + speakersPath)
		]);
		data = {
			homepage: homepageRes.data.data.attributes,
			speakers: speakersRes.data.data
		};
	} catch (e) {
		error = e;
		console.error(error);
	}
	return data;
}
