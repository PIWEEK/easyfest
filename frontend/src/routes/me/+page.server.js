import { redirect } from '@sveltejs/kit';
import { fetchCMSData, fetchCollection, fetchSingle, fetchBasic } from '../../services/api';
import { isAuthorizedUser } from '../../services/users';

/** @type {import('./$types').PageLoad} */
export async function load({ cookies, url }) {

    if (!isAuthorizedUser(cookies)) {
        redirect(302, "/login");
    }

    const activeTab = url.searchParams.get("tab") || "datos"; 

    const [settings, user, allActivities] = await Promise.all([
        fetchSingle("/setting", cookies),
        fetchBasic("/users/me?populate[activities_registered][filters][publishedAt][$notNull]=true&populate[activities_queued][filters][publishedAt][$notNull]=true", cookies),
        fetchCollection("/activities?filters[needs_registration][$eq]=true&sort=title:asc", cookies),
	]);

    // Filter out activities already registered by this user.
    const registeredIds = new Set(user.activities_registered.map(activity => activity.id));
    const queuedIds = new Set(user.activities_queued.map(activity => activity.id));
    const activities = allActivities.filter(activity => !registeredIds.has(activity.id) && (!queuedIds.has(activity.id)));
    return { settings, user, activities, activeTab };
    
}

export const actions = {
  signIn: async ({ url, cookies }) => {
    const activityId = url.searchParams.get("activityId"); 
    const [settings, user, activity] = await Promise.all([
        fetchSingle("/setting", cookies),
        fetchBasic("/users/me", cookies),
        fetchSingle(`/activities/${activityId}?populate[registered_users][count]=true`, cookies),
    ]);
    if (!settings.show_activity_registration) {
        return { success: false, message: "La inscripción a actividades no está activada." };
    }
    if (!user) {
        return { success: false, message: "No se ha podido encontrar el usuario." };
    }
    if (!activity) {
        return { success: false, message: "No se ha podido encontrar la actividad." };
    }

    const limit = activity.attendees_limit;
    const registeredCount = activity.registered_users?.count || 0;

    if (!limit || limit > registeredCount) {
        const { response, error } = await fetchCMSData(
            "PUT",
             `/activities/${activityId}`,
             {
                data: {
                    registered_users: {
                        connect: [user.documentId]
                    }
                },
             },
             cookies
        );
        if (response) {
            return { success: true, message: `Te has inscrito en la actividad '${activity.title}'` };
        } else {
            return { success: false, message: error.message };
        }
    } else {
        const { response, error } = await fetchCMSData(
            "PUT",
             `/activities/${activityId}`,
             {
                data: {
                    queued_users: {
                        connect: [user.documentId]
                    }
                },
             },
             cookies
        );
        if (response) {
            return { success: true, message: `¡Lo sentimos! No quedan plazas disponibles en la actividad '${activity.title}'. Te hemos añadido a la cola de espera. Contacta con las personas responsables para saber si se libera alguna plaza más adelante.` };
        } else {
            return { success: false, message: error.message };
        }
    }
  },

  signOut: async ({ url, cookies }) => {
    const activityId = url.searchParams.get("activityId"); 
    const [settings, user, activity] = await Promise.all([
        fetchSingle("/setting", cookies),
        fetchBasic("/users/me", cookies),
        fetchSingle(`/activities/${activityId}`, cookies),
    ]);
    if (!settings.show_activity_registration) {
        return { success: false, message: "La inscripción a actividades no está activada." };
    }
    if (!user) {
        return { success: false, message: "No se ha podido encontrar el usuario." };
    }
    if (!activity) {
        return { success: false, message: "No se ha podido encontrar la actividad." };
    }

    const { response, error } = await fetchCMSData(
        "PUT",
            `/activities/${activityId}`,
            {
            data: {
                registered_users: {
                    disconnect: [user.documentId]
                }
            },
            },
            cookies
    );
    if (response) {
        return { success: true, message: `Te has borrado de la actividad '${activity.title}'` };
    } else {
        return { success: false, message: error.message };
    }
  },

  signOutQueued: async ({ url, cookies }) => {
    const activityId = url.searchParams.get("activityId"); 
    const [settings, user, activity] = await Promise.all([
        fetchSingle("/setting", cookies),
        fetchBasic("/users/me", cookies),
        fetchSingle(`/activities/${activityId}`, cookies),
    ]);
    if (!settings.show_activity_registration) {
        return { success: false, message: "La inscripción a actividades no está activada." };
    }
    if (!user) {
        return { success: false, message: "No se ha podido encontrar el usuario." };
    }
    if (!activity) {
        return { success: false, message: "No se ha podido encontrar la actividad." };
    }

    const { response, error } = await fetchCMSData(
        "PUT",
            `/activities/${activityId}`,
            {
            data: {
                queued_users: {
                    disconnect: [user.documentId]
                }
            },
            },
            cookies
    );
    if (response) {
        return { success: true, message: `Te has borrado de la actividad '${activity.title}'` };
    } else {
        return { success: false, message: error.message };
    }
  }
};