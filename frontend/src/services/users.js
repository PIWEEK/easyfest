import { apiClient } from "./api"

const apiToken = import.meta.env.VITE_API_TOKEN;

if (!apiToken || apiToken.startsWith("<")) {
  console.error("Please, define VITE_API_TOKEN in `.env`")
}

/**
 * Store in cookies user information retrieved by login.
 * 
 * @param {object} cookies
 * @param {string} jwt
 * @param {object} user
 */
export const setUser = (cookies, jwt, user) => {
    const userCard = {
        username: user.username,
        email: user.email,
    }
    cookies.set("jwt", jwt, { path: "/" });
    cookies.set("userCard", JSON.stringify(userCard), { path: "/" });
}

/**
 * Clear all the user info stored in cookies.
 * 
 * @param {object} cookies
 */
export const resetUser = (cookies) => {
    cookies.delete("jwt", { path: "/" })
    cookies.delete("userCard", { path: "/" })
}

/**
 * Return true if the user has authenticated.
 * 
 * @param {object} cookies
 */
export const isAuthorizedUser = (cookies) => {
    const jwt = cookies?.get("jwt");
    return (jwt != undefined);
}

/**
 * Return the JWT user token if authorized, or the general API token if not.
 * 
 * @param {object} cookies
 */
export const getAuthToken = (cookies) => {
    const jwt = cookies?.get("jwt");
    if (jwt) {
        return jwt;
    } else {
        return apiToken;
    }
}

/**
 * Return the basic user card (username, email) if logged in, or undefined if not.
 * 
 * @param {object} cookies
 */
export const getUserCard = (cookies) => {
    const userCard = cookies?.get("userCard");
    if (userCard) {
        return JSON.parse(userCard);
    }
}
