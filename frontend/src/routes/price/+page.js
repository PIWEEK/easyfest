import { encodeQuery, fetchBasic, fetchCollection } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
	const tshirtImagesPath = `/upload/files?${encodeQuery({
		filters: {
			name: {
				$startsWith: 'camiseta'
			}
		},
		sort: ['name:asc']
	})}`;

	const allIncludedPriceCardPath = `/upload/files?${encodeQuery({
		filters: {
			name: {
				$eq: 'carta_ti.jpeg'
			}
		}
	})}`;

	const [priceEntries, tshirtImages, allIncludedPriceCards] = await Promise.all([
		fetchCollection('/prices?populate=*'),
		fetchBasic(tshirtImagesPath),
		fetchBasic(allIncludedPriceCardPath)
	]);

	return {
		prices: priceEntries ?? [],
		tshirtImages: tshirtImages ?? [],
		allIncludedPriceCard: allIncludedPriceCards?.[0] ?? null
	};
}
