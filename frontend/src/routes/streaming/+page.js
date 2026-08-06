import { encodeQuery, fetchBasic, fetchSingle } from '../../services/api';

const CONTENT_SEPARATOR = '-----';
const SHOP_IMAGE_PREFIX = 'puesto_';
const FIELD_NAMES = [
	'Nombre',
	'Persona a cargo',
	'Descripción',
	'Enlaces',
	'Imagen',
	'Contacto para encargos previos'
];

/**
 * @typedef {object} StrapiImage
 * @property {string | number} [id]
 * @property {string} [name]
 * @property {string} [hash]
 * @property {string} [url]
 * @property {string} [alternativeText]
 */

function splitShopContent(content = '') {
	const [intro = '', ...shopBlocks] = content.split(CONTENT_SEPARATOR);

	return {
		intro: intro.trim(),
		shopText: shopBlocks.join(CONTENT_SEPARATOR).trim()
	};
}

function escapeHtml(value = '') {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function renderInlineMarkdown(value = '') {
	return escapeHtml(value)
		.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
		.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
		.replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function markdownToHtml(value = '') {
	return value
		.split(/\n{2,}/)
		.map((block) => block.trim())
		.filter(Boolean)
		.map((block) => `<p>${renderInlineMarkdown(block).replace(/\n/g, '<br>')}</p>`)
		.join('');
}

function splitStallBlocks(shopText = '') {
	const normalizedText = shopText.replace(/\r\n/g, '\n');
	const matches = [...normalizedText.matchAll(/(^|\n)\s*-\s*Nombre\s*:/g)];

	if (matches.length === 0) return [];

	return matches.map((match, index) => {
		const start = match.index + match[1].length;
		const end = matches[index + 1]?.index ?? normalizedText.length;

		return normalizedText.slice(start, end).trim();
	});
}

function parseLinks(value = '') {
	return value
		.split(';')
		.map((linkText) => linkText.trim())
		.filter(Boolean)
		.map((linkText) => {
			const markdownLink = linkText.match(/\[([^\]]+)\]\(([^)]+)\)/);

			if (markdownLink) {
				return {
					label: markdownLink[1].trim(),
					url: markdownLink[2].trim()
				};
			}

			return {
				label: linkText,
				url: linkText
			};
		});
}

function normalizeImageName(name = '') {
	return name
		.trim()
		.replace(/\.[a-z0-9]+$/i, '')
		.toLowerCase();
}

function parseImageNames(value = '') {
	return value
		.split(';')
		.map(normalizeImageName)
		.filter(Boolean);
}

/**
 * @param {string[]} imageNames
 * @param {StrapiImage[]} strapiImages
 * @returns {StrapiImage[]}
 */
function findImagesByNames(imageNames = [], strapiImages = []) {
	/** @type {StrapiImage[]} */
	const matchedImages = [];
	const matchedIds = new Set();

	for (const imageName of imageNames) {
		const shouldMatchPrefix = /^puesto_\d+$/i.test(imageName);
		const matches = strapiImages.filter((image) => {
			const candidateNames = [image.name, image.hash, image.url?.split('/').pop()]
				.filter(Boolean)
				.map(normalizeImageName);

			return candidateNames.some((candidateName) => {
				if (candidateName === imageName) return true;

				return shouldMatchPrefix && candidateName.startsWith(`${imageName}_`);
			});
		});

		for (const image of matches) {
			const imageId = image.id ?? image.url ?? image.name;

			if (!matchedIds.has(imageId)) {
				matchedImages.push(image);
				matchedIds.add(imageId);
			}
		}
	}

	return matchedImages;
}

/**
 * @param {string} block
 * @param {StrapiImage[]} strapiImages
 * @param {number} index
 */
function parseStallBlock(block = '', strapiImages = [], index = 0) {
	/** @type {Record<string, string>} */
	const fields = Object.fromEntries(FIELD_NAMES.map((fieldName) => [fieldName, '']));
	/** @type {string[]} */
	const descriptions = [];
	const lines = block.split('\n');
	let currentField = null;

	for (const line of lines) {
		const fieldMatch = line.match(/^\s*-\s*([^:]+)\s*:\s*(.*)$/);

		if (fieldMatch && FIELD_NAMES.includes(fieldMatch[1].trim())) {
			currentField = fieldMatch[1].trim();
			const fieldValue = fieldMatch[2].trim();

			if (currentField === 'Descripción') {
				descriptions.push(fieldValue);
			} else {
				fields[currentField] = fieldValue;
			}
		} else if (currentField && line.trim()) {
			if (currentField === 'Descripción') {
				const lastDescriptionIndex = descriptions.length - 1;
				descriptions[lastDescriptionIndex] =
					`${descriptions[lastDescriptionIndex] ?? ''} ${line.trim()}`.trim();
			} else {
				fields[currentField] = `${fields[currentField]} ${line.trim()}`.trim();
			}
		}
	}

	const imageNames = parseImageNames(fields.Imagen);

	return {
		id: normalizeImageName(fields.Nombre) || `puesto-${index + 1}`,
		name: fields.Nombre,
		person: fields['Persona a cargo'],
		description: descriptions[0] ?? '',
		descriptions: descriptions.filter(Boolean),
		preorderContact: fields['Contacto para encargos previos'],
		links: parseLinks(fields.Enlaces),
		images: findImagesByNames(imageNames, strapiImages)
	};
}

/**
 * @param {string} shopText
 * @param {StrapiImage[]} strapiImages
 */
function parseStalls(shopText = '', strapiImages = []) {
	return splitStallBlocks(shopText)
		.map((block, index) => parseStallBlock(block, strapiImages, index))
		.filter((stall) => stall.name);
}

/** @type {import('./$types').PageLoad} */
export async function load({}) {
	const shopImagesPath = `/upload/files?${encodeQuery({
		filters: {
			name: {
				$startsWith: SHOP_IMAGE_PREFIX
			}
		},
		sort: ['name:asc']
	})}`;

	const [streamingEntry, shopImages] = await Promise.all([
		fetchSingle('/streaming', /** @type {any} */ (undefined)),
		fetchBasic(shopImagesPath, /** @type {any} */ (undefined))
	]);

	const data = streamingEntry || {};
	const { intro, shopText } = splitShopContent(data.content);

	if (data?.title) {
		data.title = data.title.trim();
	}

	return {
		...data,
		intro,
		introHtml: markdownToHtml(intro),
		stalls: parseStalls(shopText, shopImages ?? [])
	};
}
