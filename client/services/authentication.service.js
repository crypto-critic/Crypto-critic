import { apiPrefix, login , register } from '../endpoints';
import axios from 'axios';
export const loginService = (query) => new Promise((res) => {
    const { email, password, domain } = query
    let opts = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ email, password }),
        url: domain ? ( domain + apiPrefix + login.path) : (apiPrefix + login.path)
    };
    axios(opts)
        .then(result => res(result.data))
        .catch(err => console.log(err));
});

export const registerService = (user) => {
    const opts = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(user),
        url: apiPrefix + register.path
    };
    axios(opts)
        .then(result => res(result.data))
        .catch(err => console.log(err));
}
