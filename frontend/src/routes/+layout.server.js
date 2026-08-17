import { redirect } from '@sveltejs/kit';
import { fetchSingle } from '../services/api';
import { getUserCard } from '../services/users';

const ROUTE_VISIBILITY_FLAGS = {
	// Añade aquí las páginas que quieras bloquear cuando su flag esté en false.
	// Formato:
	// '/ruta-en-espanol': 'nombre_del_flag_en_strapi',
	// '/internal-route': 'nombre_del_flag_en_strapi',

	'/registro': 'loginEnabled',
	'/register': 'loginEnabled',

	'/noticias': 'show_news_items',
	'/news-items': 'show_news_items',

	'/faqs': 'show_faqs',

	'/prensa': 'show_press_kit',
	'/press-kit': 'show_press_kit',

	'/esteltienda': 'show_streaming',
	'/sponsors': 'show_streaming',

	'/estel-tienda': 'show_streaming',
	'/streaming': 'show_streaming',

	'/seo': 'show_seo',

	'/tracks': 'show_tracks'
};

function getVisibilityFlag(pathname) {
	if (ROUTE_VISIBILITY_FLAGS[pathname]) {
		return ROUTE_VISIBILITY_FLAGS[pathname];
	}

	const firstSegment = `/${pathname.split('/').filter(Boolean)[0] ?? ''}`;

	return ROUTE_VISIBILITY_FLAGS[firstSegment];
}

export async function load({ cookies, url }) {
	let data = {};

	const [settingsEntry, siteEntry] = await Promise.all([
		fetchSingle('/setting?populate=*'),
		fetchSingle('/site')
	]);

	if (settingsEntry || siteEntry) {
		data = { ...settingsEntry, ...siteEntry };
	}

	const visibilityFlag = getVisibilityFlag(url.pathname);

	if (visibilityFlag && data[visibilityFlag] !== true) {
		redirect(302, '/no-disponible');
	}

	const userCard = getUserCard(cookies);

	return { ...data, ...userCard };
}
