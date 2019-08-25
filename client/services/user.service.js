import { handleResponse } from './handleResponse';
import { apiPrefix, userInfo } from '../endpoints';

export const getUserInfo = async (headers) => {
    const requestOptions = {
        method: 'GET',
        headers,
        body: JSON.stringify(user)
    };
    let requestUrl = domain ? ( domain + apiPrefix + userInfo.path) : (apiPrefix + userInfo.path)
    return fetch(requestUrl, requestOptions).then(handleResponse);
};
