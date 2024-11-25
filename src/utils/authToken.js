
 import {  getStorage,createStorage, removeStorage } from "./localStorage";

// const TOKEN_KEY = '_APP_TOKEN_KEY_';

// /**
//  * Retrieves the user token from local storage
//  * @returns {String|null}
//  */
// const getToken = () => {
//     return getStorage(TOKEN_KEY) ?? '';
// }

// const setToken = (token) => {
//     // console.log('setToken', token)
//     return createStorage(TOKEN_KEY, token)
// }

// const removeToken = () => {
//     return removeStorage(TOKEN_KEY)
// }

// export {TOKEN_KEY, getToken, setToken, removeToken };

// import { getStorage, createStorage, removeStorage } from "./localStorage";

// const ADMIN_TOKEN_KEY = '_APP_ADMIN_TOKEN_KEY_';
// const USER_TOKEN_KEY = '_APP_USER_TOKEN_KEY_';

// /**
//  * Retrieves the admin token from local storage
//  * @returns {String|null}
//  */
// const getAdminToken = () => {
//     return getStorage(ADMIN_TOKEN_KEY) ?? '';
// }

// /**
//  * Sets the admin token in local storage
//  * @param {String} token 
//  */
// const setAdminToken = (token) => {
//     return createStorage(ADMIN_TOKEN_KEY, token);
// }

// /**
//  * Removes the admin token from local storage
//  */
// const removeAdminToken = () => {
//     return removeStorage(ADMIN_TOKEN_KEY);
// }

// /**
//  * Retrieves the user token from local storage
//  * @returns {String|null}
//  */
// const getUserToken = () => {
//     return getStorage(USER_TOKEN_KEY) ?? '';
// }

// /**
//  * Sets the user token in local storage
//  * @param {String} token 
//  */
// const setUserToken = (token) => {
//     return createStorage(USER_TOKEN_KEY, token);
// }

// /**
//  * Removes the user token from local storage
//  */
// const removeUserToken = () => {
//     return removeStorage(USER_TOKEN_KEY);
// }

// export {
//     ADMIN_TOKEN_KEY,
//     USER_TOKEN_KEY,
//     getAdminToken,
//     setAdminToken,
//     removeAdminToken,
//     getUserToken,
//     setUserToken,
//     removeUserToken,
// };

const ADMIN_TOKEN_KEY = '_APP_ADMIN_TOKEN_KEY_';
 const USER_TOKEN_KEY = '_APP_USER_TOKEN_KEY_';
 
const getToken = (role) => {
    const key = role === 'admin' ? ADMIN_TOKEN_KEY : USER_TOKEN_KEY;
    return getStorage(key) ?? '';
};

const setToken = (role, token) => {
    const key = role === 'admin' ? ADMIN_TOKEN_KEY : USER_TOKEN_KEY;
    return createStorage(key, token);
};

const removeToken = (role) => {
    const key = role === 'admin' ? ADMIN_TOKEN_KEY : USER_TOKEN_KEY;
    return removeStorage(key);
};

export { getToken, setToken, removeToken };
