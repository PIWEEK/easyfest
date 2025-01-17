import { createI18n } from "@inlang/paraglide-sveltekit"
import * as runtime from "$lib/paraglide/runtime.js"

export const i18n = createI18n(runtime, {

    defaultLanguageTag: "es",

	pathnames: {
		"/about-us" : {
			en: "/about-us",
			es: "/sobre-nosotros",
		},
		"/accommodation-info" : {
			en: "/accommodation-info",
			es: "/como-llegar",
		},
		"/activities" : {
			en: "/activities",
			es: "/actividades",
		},
		"/agenda" : {
			en: "/agenda",
			es: "/agenda",
		},
		"/code-of-conduct" : {
			en: "/code-of-conduct",
			es: "/codigo-de-conducta",
		},
		"/contact-info" : {
			en: "/contact-info",
			es: "/contacto",
		},
		"/cookie-policy" : {
			en: "/cookie-policy",
			es: "/politica-de-cookies",
		},
		"/faqs" : {
			en: "/faqs",
			es: "/faqs",
		},
		"/get-link" : {
			en: "/get-link",
			es: "/obtener-enlace",
		},
		"/login" : {
			en: "/login",
			es: "/entrar",
		},
		"/me" : {
			en: "/me",
			es: "/mi-cuenta",
		},
		"/news-items" : {
			en: "/news-items",
			es: "/noticias",
		},
		"/org-team" : {
			en: "/org-team",
			es: "/equipo-organizador",
		},
		"/press-kit" : {
			en: "/press-kit",
			es: "/kit-de-prensa",
		},
		"/privacy-policy" : {
			en: "/privacy-policy",
			es: "/politica-de-privacidad",
		},
		"/register" : {
			en: "/register",
			es: "/registro",
		},
		"/registration" : {
			en: "/registration",
			es: "/inscripcion",
		},
		"/seo" : {
			en: "/seo",
			es: "/seo",
		},
		"/speakers" : {
			en: "/speakers",
			es: "/ponentes",
		},
		"/sponsors" : {
			en: "/sponsors",
			es: "/patrocinadores",
		},
		"/streaming" : {
			en: "/streaming",
			es: "/streaming",
		},
		"/tracks" : {
			en: "/tracks",
			es: "/tracks",
		},
		"/venue-info" : {
			en: "/venue-info",
			es: "/el-lugar",
		},
		"/precios" : {
			en: "/prices",
			es: "/precios",
		},
    }
});
