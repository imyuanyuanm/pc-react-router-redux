/* eslint-disable */
import fetch from 'isomorphic-fetch';
const errorMessages = res => `${res.status} ${res.statusText}`;
function check401(res) {
    if (res.status === 401 && !res.url.match('login.html')) {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        return Promise.reject(errorMessages(res));
    }
    return res;
}

function jsonParse(res) {
    return res.json();
}

function setUriParam(keys, value, keyPostfix) {
    let keyStr = keys[0];

    keys.slice(1).forEach((key) => {
        keyStr += `[${key}]`;
    });

    if (keyPostfix) {
        keyStr += keyPostfix;
    }
    return `${encodeURIComponent(keyStr)}=${encodeURIComponent(value)}`;
}

function getUriParam(keys, object) {
    const array = [];

    if (object instanceof Array) {
        object.forEach((value) => {
            array.push(setUriParam(keys, value, '[]'));
        });
    } else if (object instanceof Object) {
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const value = object[key];

                array.push(getUriParam(keys.concat(key), value));
            }
        }
    } else if (object !== undefined) {
        array.push(setUriParam(keys, object));
    }

    return array.join('&');
}

function toQueryString(object) {
    const array = [];
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const str = getUriParam([key], object[key]);

            if (str) {
                array.push(str);
            }
        }
    }
    return array.join('&');
}

function cFetch(url, options) {
    let mergeUrl = url;
    const defaultOptions = {
        method: 'GET',
        credentials: 'same-origin',
    };


    const opts = Object.assign({}, defaultOptions, { ...options });
    if (opts && opts.method.toUpperCase() === 'GET' && opts.params) {
        mergeUrl = `${mergeUrl}?${toQueryString(opts.params)}`;
    }
    opts.headers = {
        ...opts.headers,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    const fetchResult = fetch(mergeUrl, opts)
        .then(check401)
        .then(jsonParse);
    return fetchResult;
}


export default cFetch;
