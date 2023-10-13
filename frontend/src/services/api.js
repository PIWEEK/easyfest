const base = import.meta.env.VITE_API_URL

if (!base) {
  console.error("Please, define API_URL in `.env.local`")
  console.log(base)
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
export const apiClient = (method, resource, data) => {

  const content = {
		method,
    headers: {...baseHeaders},
  }
  if (data) {
    content.body = data && JSON.stringify(data)
  }

	return fetch(`${base}/${resource}`, content)
    .then(response => response.json()) //review how data is sent back
    .catch(console.error)
}
