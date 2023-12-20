import { redirect } from '@sveltejs/kit';
import { apiClient } from '../../services/api';

/** @type {import('./$types').PageLoad} */
export async function load({ params, cookies }) {

    const authToken = cookies ? cookies.get("easyfest-auth") : null
    if (!authToken) {
        throw redirect(302, "/get-link")
    }

    const user = await apiClient("GET", "users/me", {}, authToken)
    console.log("user", user)

    const activities = await apiClient("GET", "activities?populate=*", {}, authToken)
    console.log("activities", activities)

    return {
        user,
        activities: activities.data,
    };
}