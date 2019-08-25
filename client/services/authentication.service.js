import { apiPrefix, login , register } from '../endpoints';
import { handleResponse } from './handleResponse';
export const loginService = async ({ email, password }, { domain } = undefined ) => {
    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
    let requestUrl = domain ? ( domain + apiPrefix + login.path) : (apiPrefix + login.path)
    return fetch(requestUrl, requestOptions).then(handleResponse);
}

export const registerService = (user, { domain } = undefined) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    let requestUrl = domain ? ( domain + apiPrefix + register.path) : (apiPrefix + register.path)
    return fetch(requestUrl, requestOptions).then(handleResponse);
}
