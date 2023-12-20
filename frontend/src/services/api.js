import axios from 'axios'

const base = import.meta.env.VITE_API_URL

if (!base) {
  console.error("Please, define API_URL in `.env.local`")
}

const baseHeaders = {
  "content-type": "application/json",
  "Accept": "application/json"
}

/**
 * @param {string} method ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
 * @param {string} resource
 * @param {Record<string, unknown>} [data]
 */
export const apiClient = (method, resource, data, authToken) => {
  const authHeaders = authToken ? {"Authorization": `Bearer ${authToken}`} : {}

  const config = {
		method,
    headers: {...baseHeaders, ...authHeaders},
  }
  if (data) {
    config.data = data && JSON.stringify(data)
  }

	return axios(`${base}/${resource}`, config)
    .then(response => response.data)
    .catch((err) => console.error("######error",  err.response.data.error))
}
