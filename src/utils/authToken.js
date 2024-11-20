
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
    // console.log('setToken', token)
    return createStorage(TOKEN_KEY, token)
}

const removeToken = () => {
    return removeStorage(TOKEN_KEY)
}

export {TOKEN_KEY, getToken, setToken, removeToken };