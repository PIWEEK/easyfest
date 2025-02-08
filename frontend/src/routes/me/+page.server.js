import { redirect } from '@sveltejs/kit';
import { fetchCMSData } from '../../services/api';
import { isAuthorizedUser } from '../../services/users';

/** @type {import('./$types').PageLoad} */
export async function load({ cookies }) {

    if (!isAuthorizedUser(cookies)) {
        redirect(302, "/login");
    }

    const { response, error } = await fetchCMSData("GET", "/users/me", {}, cookies) || {};

//     const activities = await apiClient("GET", "activities?populate=*", {}, authToken)
//     console.log("activities", activities)

    return {
        user: response,
        // activities: activities,
    };
}