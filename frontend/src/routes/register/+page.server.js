import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { apiClient } from '../../services/api';

let data = {}

const schema = z.object({
  email: z.string().email(),
  fullname: z.string(),
  accept_code: z.boolean(),
  accept_terms: z.boolean(),
});

export async function load({ params }) {
    // const form = await superValidate(schema);
    const form = null;
    return { form };
}

export const actions = {
    default: async ({ request }) => {
      const form = await superValidate(request, schema);

      if (!form.valid) {
        return fail(400, { form });
      }

      const res = await apiClient(
        "POST", "passwordless/send-link", {
           email: form.data.email,
           username: form.data.fullname,
           context: {}
         }, null
      )

      console.log("====res", res)

      return message(form, ((res && res.sent) ? 'success' : ''));
    }
  };