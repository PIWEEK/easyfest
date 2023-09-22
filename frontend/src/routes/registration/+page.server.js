import axios from 'axios'
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

const base = import.meta.env.VITE_API_URL
const path = "/site"
const path_registration_info = "/registration-info"


let data = {}

const baseHeaders = {
    "content-type": "application/json",
    "Accept": "application/json"
  }

/**
 * @param {string} method ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
 * @param {string} resource
 * @param {Record<string, unknown>} [data]
 */
const apiClient = (method, resource, data) => {

    const content = {
      method,
      headers: {...baseHeaders},
    }
    if (data) {
      content.body = JSON.stringify(data)
    }

      return fetch(`${base}/${resource}`, content)
      .then(response => response.json()) //review how data is sent back
      .catch(console.error)
  }


export async function load({ params }) {
    let fetch_site_data = {}
    let fetch_registration_info_data = {}
    let error = null

    try {
        const res_site = await axios(base+path);
        fetch_site_data = res_site.data.data.attributes
        const res_registration_info = await axios(base+path_registration_info);
        fetch_registration_info_data = res_registration_info.data.data.attributes
    } catch (e) {
        error = e
    }
    const form = await superValidate(schema);
    return {fetch_site_data, fetch_registration_info_data, form};
}

// Manual schema based on STRAPI registration collection

const schema = z.object({
  fullname: z.string(),
  email: z.string().email(),
  title: z.string(),
  organization: z.string(),
  pronouns: z.string()

});

export const actions = {
    default: async ({ request }) => {
      const form = await superValidate(request, schema);

      // Convenient validation check:
      if (!form.valid) {
        // Again, always return { form } and things will just work.
        return fail(400, { form });
      }

      // TODO: Do something with the validated data

      const {data} = await apiClient(
        "POST", "registrations?populate=*",
        { data: form.data }
      )

      // Yep, return { form } here too
      return { form };
    }
  };