import { apiClient } from "./api"
import { localStorage } from "./storage"

export const register = (email, password) {
    const result = await apiClient("POST", "auth/local/register", {
        username: email,
        email,
        password
    })

    if (result.user) {
        localStorage.set("token", result.jwt)
        localStorage.set("user", result.user)
    }

    return result.user
}

export const login = (email, password) {
    const result = await apiClient("POST", "auth/local", {
        identifier: email,
        password
    })

    if (result.user) {
        localStorage.set("token", result.jwt)
        localStorage.set("user", result.user)
    }

    return result.user
}

export const logout = () => {
    localStorage.remove("token")
    localStorage.remove("user")
}

export const currentUser = () => {
    return localStorage.get("user")
}
