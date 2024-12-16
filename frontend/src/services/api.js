import axios from 'axios'
import qs from 'qs';

const base = import.meta.env.VITE_API_URL

if (!base) {
  console.error("Please, define API_URL in `.env.local`")
}

const baseHeaders = {
  "content-type": "application/json",
  "Accept": "application/json"
}

/**
 * Build a query string from a values object.
 * 
 * @type {(query: object) => string}
 */
export const encodeQuery = (query) =>
	qs.stringify(query, {
		encodeValuesOnly: true // prettify URL
	});

/**
 * Generic request to backend API.
 * 
 * @param {string} method ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
 * @param {string} path
 * @param {Record<string, unknown>} [payload]
 * @param {string} [authToken]
 */
export const fetchCMSData = async (method, path, payload, authToken) => {
  if (!base) {
    return null;
  }

  const authHeaders = authToken ? {"Authorization": `Bearer ${authToken}`} : {};
  const headers = {...baseHeaders, ...authHeaders};

  const config = {
		method,
    headers: {...baseHeaders, ...authHeaders},
    data: payload && JSON.stringify(payload),
  }

  try {
    const response = await axios(`${base}${path}`, config);
    return response.data;
  } catch(err) {
    console.error(`ERROR fetching data $(method) $(path)`, err);
    return null;
  }
}

/**
 * Call backend API to retrieve a single type.
 * 
 * @param {string} path
 */
export const fetchSingle = async (path) => {
  // console.log("######################path", path)
  const data = await fetchCMSData("GET", path);
  if (data) {
    // For a single type, the response is like
    //   {
    //     "data": {
    //       "id": 12345,
    //       "attributes": {
    //         "attr1": val1,
    //         "attr2": val2,
    //         ...
    //       }
    //     },
    //     "meta": {}
    //   }
    return data.data.attributes;
  }
}

/**
 * @param {string} method ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
 * @param {string} path
 * @param {Record<string, unknown>} [data]
 * @param {string} [authToken]
 */
export const apiClient = (method, path, data, authToken) => {
  const authHeaders = authToken ? {"Authorization": `Bearer ${authToken}`} : {}

  const config = {
		method,
    headers: {...baseHeaders, ...authHeaders},
  }
  if (data) {
    config.data = data && JSON.stringify(data)
  }

	return axios(`${base}/${path}`, config)
    .then(response => response.data)
    .catch((err) => console.error("######error",  err.response.data.error))
}
