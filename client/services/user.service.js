import { apiPrefix, userInfo } from '../endpoints';
import axios from 'axios';

export const getUserInfo = (headers) => new Promise((res, rej) => {
    const opts = {
        method: 'get',
        headers,
        url: apiPrefix + userInfo.path
    };
    axios(opts)
        .then(result => res(result.data))
        .catch(err => rej(err))
        .finally(console.log('Get user info'))
});
