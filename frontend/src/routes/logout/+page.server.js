import { redirect } from '@sveltejs/kit';
import { isAuthorizedUser, resetUser } from '../../services/users';

export async function load({ params, cookies }) {
    if (isAuthorizedUser(cookies)) {
        resetUser(cookies);
    }
    redirect(302, "/");
}