import { encodeQuery, fetchBasic, fetchCollection } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
	const tshirtFrontImagePath = `/upload/files?${encodeQuery({
		filters: {
			name: {
				$eq: 'camiseta.jpg'
			}
		}
	})}`;

	const tshirtBackImagePath = `/upload/files?${encodeQuery({
		filters: {
			name: {
				$eq: 'camiseta_trasera.jpg'
			}
		}
	})}`;

	const [priceEntries, tshirtFrontImages, tshirtBackImages] = await Promise.all([
		fetchCollection('/prices?populate=*'),
		fetchBasic(tshirtFrontImagePath),
		fetchBasic(tshirtBackImagePath)
	]);

	return {
		prices: priceEntries ?? [],
		tshirtImages: [tshirtFrontImages?.[0], tshirtBackImages?.[0]].filter(Boolean)
	};
}
