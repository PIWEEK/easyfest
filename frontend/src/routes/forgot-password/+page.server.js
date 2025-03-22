import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import * as m from '$lib/paraglide/messages.js'
import { zod } from 'sveltekit-superforms/adapters';
import { fetchCMSData } from '../../services/api';
import { isAuthorizedUser, setUser } from '../../services/users';

let data = {}

const schema = z.object({
  email: z.string().email(),
});

export async function load({ params, cookies }) {
    if (isAuthorizedUser(cookies)) {
      redirect(302, "/me");
    }
    const form = await superValidate(zod(schema));
    return { form };
}

export const actions = {
    default: async ({ request, cookies }) => {
      const form = await superValidate(request, zod(schema));

      if (!form.valid) {
        return fail(400, { form });
      }

      const { response, error } = await fetchCMSData(
        "POST", "/auth/forgot-password", {
           email: form.data.email,
        }, cookies
      )

      if (response) {
        return message(form, {success: m.reset_password_sent()})
      }

      let error_msg;
      if (error?.status === 400) {
        error_msg = m.email_or_password_incorrect();
      } else if (error?.message) {
        error_msg = error.message;
      } else {
        error_msg = m.an_error_has_occurred();
      }
      return message(form, {error: error_msg});
    }
  };