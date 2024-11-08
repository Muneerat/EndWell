import {  getStorage,createStorage, removeStorage } from "./localStorage";

const TOKEN_KEY = '_APP_TOKEN_KEY_';

/**
 * Retrieves the user token from local storage
 * @returns {String|null}
 */
const getToken = () => {
    return getStorage(TOKEN_KEY) ?? '';
}

const setToken = (token) => {
    return createStorage(TOKEN_KEY, token)
}

const removeToken = () => {
    return removeStorage(TOKEN_KEY)
}

export { getToken, setToken, removeToken };