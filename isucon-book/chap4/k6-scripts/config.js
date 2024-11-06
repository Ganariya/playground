
const BASE_URL = 'http://nginx';

/**
 * @param {string} path - The path to be appended to the base URL.
 * @returns {string} The constructed URL.
 */
export function url(path) {
    return `${BASE_URL}${path}`;
}