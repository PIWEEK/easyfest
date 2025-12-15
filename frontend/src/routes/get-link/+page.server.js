import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { apiClient } from '../../services/api';

let data = {}

const schema = z.object({
  email: z.string().email(),
});

export async function load({ params }) {
    const form = await superValidate(schema);
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
           context: {}
         }, ""
      )

      console.log("====res", res)

      return message(form, ((res && res.sent) ? 'success' : ''));
    }
  };