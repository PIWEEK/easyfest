import { encodeQuery, fetchBasic, fetchSingle } from '../services/api';

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

const registrationInfoPath = `/registration-info?${encodeQuery({
	populate: '*'
})}`;

const wheelGameImagePath = `/upload/files?${encodeQuery({
	filters: {
		name: {
			$eq: 'gira-el-timon.jpg'
		}
	}
})}`;

const wheelGamePagePath = `/simple-pages?${encodeQuery({
	filters: {
		path: {
			$eq: 'gira-el-timon'
		}
	}
})}`;

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	let data = {};

	const [
		homepageData,
		speakersData,
		siteData,
		registrationInfoData,
		wheelGameImages,
		wheelGamePages
	] = await Promise.all([
		fetchSingle(homepagePath),
		fetchSingle(speakersPath),
		fetchSingle(sitePath),
		fetchSingle(registrationInfoPath),
		fetchBasic(wheelGameImagePath),
		fetchSingle(wheelGamePagePath)
	]);

	data = {
		homepage: homepageData,
		speakers: speakersData,
		site: siteData,
		registrationInfo: registrationInfoData,
		wheelGameImage: wheelGameImages?.[0] ?? null,
		wheelGamePage: wheelGamePages?.[0] ?? null
	};

	return data;
}
