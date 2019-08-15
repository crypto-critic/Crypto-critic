import { handleResponse } from './handleResponse';
import { apiPrefix, userInfoUrl } from 'endpoints/endpoints';

export const getUserInfo = async (headers) => {
    const requestOptions = {
        method: 'GET',
        headers,
        body: JSON.stringify(user)
    };
    let requestUrl = domain ? ( domain + apiPrefix + userInfoUrl) : (apiPrefix + userInfoUrl)
    return fetch(requestUrl, requestOptions).then(handleResponse);
};
