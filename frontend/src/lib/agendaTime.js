// El evento es en Murcia: las horas se muestran siempre en hora peninsular,
// independientemente de la zona horaria del navegador de quien consulta
// (por ejemplo, alguien conectado desde Canarias).
const EVENT_TIMEZONE = 'Europe/Madrid';

export function formatActivityHour(start) {
	return new Date(start).toLocaleTimeString('es-ES', {
		hour: '2-digit',
		minute: '2-digit',
		timeZone: EVENT_TIMEZONE
	});
}

export function formatActivityDate(start) {
	return new Date(start).toLocaleDateString('es-ES', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		timeZone: EVENT_TIMEZONE
	});
}
