import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { fetchCMSData } from '../../services/api';

let data = {}

const schema = z.object({
  email: z.string().email(),
  fullname: z.string(),
  password: z.string(),
  accept_code: z.boolean(),
  accept_terms: z.boolean(),
});

export async function load({ params }) {
    const form = await superValidate(zod(schema));
    return { form };
}

export const actions = {
    default: async ({ request }) => {
      const form = await superValidate(request, zod(schema));

      if (!form.valid) {
        return fail(400, { form });
      }

      const { response, error } = await fetchCMSData(
        "POST", "/auth/local/register", {
           email: form.data.email,
           username: form.data.fullname,
           password: form.data.password
        }
      )

      const result = (response ? "éxito" : error?.message);
      return message(form, result);
    }
  };