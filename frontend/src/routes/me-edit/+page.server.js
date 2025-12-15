import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import * as m from '$lib/paraglide/messages.js'
import { zod } from 'sveltekit-superforms/adapters';
import { fetchCMSData } from '../../services/api';
import { isAuthorizedUser } from '../../services/users';
import { getUserCard } from '../../services/users';

let data = {}

const schema = z.object({
    phone_number: z.string(),
    smial: z.string().optional(),
    pseudonym: z.string().optional(),
    menu_type: z.enum(["carne", "pescado", "vegano"]),
    menu_comment: z.string().optional(),
    mentor: z.boolean().optional(),
    mentee: z.boolean().optional(),
    aide: z.boolean().optional(),
    premium: z.boolean().optional(),
    premium_comment: z.string().optional(),
});

/** @type {import('./$types').PageLoad} */
export async function load({ cookies }) {

    if (!isAuthorizedUser(cookies)) {
        redirect(302, "/login");
    }

    const { response, error } = await fetchCMSData("GET", "/users/me", {}, cookies) || {};

    // Change undefined or null values to empty
    const newUser = {
        ...response,
        phone_number: response.phone_number || "",
        smial: response.smial || "",
        pseudonym: response.pseudonym || "",
        menu_type: response.menu_type || "carne",
        menu_comment: response.menu_comment || "",
        mentor: response.mentor || false,
        mentee: response.mentee || false,
        aide: response.aide || false,
        premium: response.premium || false,
        premium_comment: response.premium_comment || "",
    }

    const form = await superValidate(newUser, zod(schema));

    return {
        user: newUser,
        form: form,
    };
}

export const actions = {
    default: async ({ request, cookies }) => {
        const form = await superValidate(request, zod(schema));
  
        if (!form.valid) {
            return fail(400, { form });
        }
  
        let userId;
        {
            const { response, error } = await fetchCMSData("GET", "/users/me", {}, cookies) || {};
            if (error) {
                if (error?.message) {
                    return message(form, error.message);
                } else {
                    return message(form, m.an_error_has_occurred())
                }
            } else {
                userId = response.id;
            }
        }
  
        // Change undefined values to empty
        const newData = {
            ...form.data,
            phone_number: form.data.phone_number || "",
            smial: form.data.smial || "",
            pseudonym: form.data.pseudonym || "",
            menu_type: form.data.menu_type,
            menu_comment: form.data.menu_comment || "",
            mentor: form.data.mentor || false,
            mentee: form.data.mentee || false,
            aide: form.data.aide || false,
            premium: form.data.premium || false,
            premium_comment: form.data.premium_comment || "",
        }

        const { response, error } = await fetchCMSData(
          "PUT", "/users/" + userId, newData, cookies, true
        )
  
        if (response) {
          redirect(302, "/me")
        }
  
        let error_msg;
        if (error?.status === 400) {
          error_msg = m.email_or_password_incorrect();
        } else if (error?.message) {
          error_msg = error.message;
        } else {
          error_msg = m.an_error_has_occurred();
        }
        return message(form, error_msg);
    }
  };