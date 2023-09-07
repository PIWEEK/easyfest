// eslint-disable-next-line
const dotenv = require('dotenv');
dotenv.config();

if (typeof process.env.PENPOT_ACCESS_TOKEN !== 'string') {
	throw new Error('Missing PENPOT_ACCESS_TOKEN environment variable');
}

const config = {
	instance: process.env.PENPOT_BASE_URL || undefined,
	accessToken: process.env.PENPOT_ACCESS_TOKEN,
	files: [
		{
			fileId: '4a499800-872e-80e1-8002-fc0b585dc061',
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
