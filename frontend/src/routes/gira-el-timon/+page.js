import { fetchSingle } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const pages = await fetchSingle('/simple-pages/?filters[path][$eq]=gira-el-timon');

	return (
		pages?.[0] ?? {
			title: 'Gira el timón',
			content: ''
		}
	);
}
