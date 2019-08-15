import { apiPrefix, loginUrl, registerUrl } from 'endpoints/endpoints';
import { handleResponse } from './handleResponse';
export const login = async ({ email, password }, { domain } = undefined ) => {
    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
    let requestUrl = domain ? ( domain + apiPrefix + loginUrl) : (apiPrefix + loginUrl)
    return fetch(requestUrl, requestOptions).then(handleResponse);
}

export const register = (user, { domain } = undefined) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    let requestUrl = domain ? ( domain + apiPrefix + registerUrl) : (apiPrefix + registerUrl)
    return fetch(requestUrl, requestOptions).then(handleResponse);
}
