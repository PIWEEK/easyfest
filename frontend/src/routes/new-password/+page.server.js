import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import * as m from '$lib/paraglide/messages.js'
import { zod } from 'sveltekit-superforms/adapters';
import { fetchCMSData } from '../../services/api';
import { isAuthorizedUser, setUser } from '../../services/users';

const schema = z.object({
  code: z.string(),
  password: z.string(),
  passwordConfirmation: z.string(),
});

export async function load({ url, params, cookies }) {
    if (isAuthorizedUser(cookies)) {
      redirect(302, "/me");
    }
    const code = url.searchParams.get("code");
    const form = await superValidate({code}, zod(schema));
    return { form, code };
}

export const actions = {
    default: async ({ request, cookies }) => {
      const form = await superValidate(request, zod(schema));

      if (!form.valid) {
        return fail(400, { form });
      }

      if (form.data.password != form.data.passwordConfirmation) {
        return message(form, {error: m.passwords_must_match()})
      }

      if (form.data.password.length < 6) {
        return message(form, {error: m.password_length()})
      }

      const { response, error } = await fetchCMSData(
        "POST", "/auth/reset-password", {
            code: form.data.code,
            password: form.data.password,
            passwordConfirmation: form.data.passwordConfirmation,
        }, cookies
      )

      if (response) {
        return message(form, {success: m.new_password_set()})
      }

      let error_msg;
      if (error?.status === 400) {
        error_msg = m.invalid_reset_link();
      } else if (error?.message) {
        error_msg = error.message;
      } else {
        error_msg = m.an_error_has_occurred();
      }
      return message(form, {error: error_msg});
    }
  };