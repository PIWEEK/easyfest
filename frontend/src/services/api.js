import axios from 'axios'
import qs from 'qs';
import { getAuthToken } from './users';

const base = import.meta.env.VITE_API_URL

if (!base) {
  console.error("Please, define VITE_API_URL in `.env`")
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
 * @param {object} [cookies]
 * @param {boolean} [forceApiToken]
 */
export const fetchCMSData = async (method, path, payload, cookies, forceApiToken) => {
  if (!base) {
    return {
      error: {
        message: "You need to configure base URL in .env file."
      }
    };
  }

  const authToken = getAuthToken(cookies, forceApiToken);
  const authHeaders = authToken ? {"Authorization": `Bearer ${authToken}`} : {};
  const headers = {...baseHeaders, ...authHeaders};

  const config = {
		method,
    headers: {...baseHeaders, ...authHeaders},
    data: payload && JSON.stringify(payload),
  }
  
  try {
    const response = await axios(`${base}${path}`, config);
    return { response: response.data };
  } catch(error) {
    console.error(`ERROR fetching data ${method} ${base}${path}`, error.toJSON());
    return {
      error: {
        status: error.status,
        message: error.message
      }
    };
  }
}

/**
 * Call backend API to retrieve a single type.
 * 
 * @param {string} path
 * @param {object} cookies
 */
export const fetchSingle = async (path, cookies) => {
  const { response, error } = await fetchCMSData("GET", path, {}, cookies);
  if (response) {
    /* For a single CMS type, the response is like
     *   {
     *     "data": {
     *       "id": 12345,
     *       "attr1": val1,
     *       "attr2": val2,
     *       ...
     *     },
     *     "meta": {}
     *   }
     */
    return response.data;
  } else {
    console.error("->", error.message)
    return null;
  }
}

/**
 * call backend api to retrieve a collection type.
 * 
 * @param {string} path
 * @param {object} cookies
 */
export const fetchCollection = async (path, cookies) => {
  const { response, error } = await fetchCMSData("GET", path, {}, cookies);
  if (response) {
    /* for a collection CMS type, the response is like
     *   {
     *     "data": [
     *       {
     *         "id": 12345,
     *         "attr1": val1,
     *         "attr2": val2,
     *         ...
     *       },
     *       {
     *         "id": 67890,
     *         "attr1": val3,
     *         "attr2": val4,
     *         ...
     *       },
     *     ],
     *     "meta": {}
     *   }
    */
    return response.data;
  } else {
    console.error("->", error.message)
    return [];
  }
}

/**
 * Call backend API to retrieve a basic type.
 * 
 * @param {string} path
 * @param {object} cookies
 */
export const fetchBasic = async (path, cookies) => {
  const { response, error } = await fetchCMSData("GET", path, {}, cookies);
  if (response) {
    /* For a basic Strapi API type, the response is directly the requested object
     *   {
     *     "id": 12345,
     *     "attr1": val1,
     *     "attr2": val2,
     *     ...
     *   }
     */
    return response;
  } else {
    console.error("->", error.message)
    return null;
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
    .catch((err) => console.error("###### error:",  err.response.data.error))
}
