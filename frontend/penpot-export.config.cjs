// eslint-disable-next-line
const dotenv = require('dotenv');
dotenv.config();

if (typeof process.env.PENPOT_ACCESS_TOKEN !== 'string') {
	throw new Error('Missing PENPOT_ACCESS_TOKEN environment variable');
}

if (typeof process.env.PENPOT_FILE_ID !== 'string') {
	throw new Error('Missing PENPOT_FILE_ID environment variable');
}

const config = {
	instance: process.env.PENPOT_BASE_URL || undefined,
	accessToken: process.env.PENPOT_ACCESS_TOKEN,
	files: [
		{
			fileId: process.env.PENPOT_FILE_ID,
			colors: [
				{
					output: 'src/design-system/colors.scss',
					format: 'scss'
				}
			],
			typographies: [
				{
					output: 'src/design-system/typographies.scss',
					format: 'scss'
				}
			]
		}
	]
};

module.exports = config;
