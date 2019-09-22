import { apiPrefix, login , register } from '../endpoints';
import axios from 'axios';
export const loginService = (query) => new Promise((res, rej) => {
    const { email, password, domain } = query
    let opts = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ email, password }),
        url: domain ? ( domain + apiPrefix + login.path) : (apiPrefix + login.path)
    };
    axios(opts)
        .then(result => res(result.data))
        .catch(err => rej(err));
});

export const registerService = (user) => new Promise((res, rej) => {
    const opts = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: user,
        url: apiPrefix + register.path
    };
    axios(opts)
        .then(result => {
            res(result.data)
        })
        .catch(err => rej(err));
})
