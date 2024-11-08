
/**
 * 
 * @param {String} key - The key with which to identify the storage data
 * 
 * @returns {mixed}
 */
const getStorage = (key) => {
    let data = localStorage.getItem(key);

    if (data) {
        return data
    }

    return null;
}

/**
 * adds a new data to the local storage
 * @param {String} key 
 * @param {mixed} data 
 * @return {void}
 */
const createStorage = (key, data) => {
    let newData = data;

    if (typeof data === 'object' || typeof data === 'symbol') {
        newData = JSON.stringify(data);
    }

    localStorage.setItem(key,  newData);
}

/**
 * Removes data from local storage using the provided key
 * 
 * @param {String} key 
 * @returns {Boolean}
 */
const removeStorage = (key) => {
    if (localStorage.removeItem(key)) {
        return true;
    }

    return false;
}

export { getStorage, createStorage, removeStorage};