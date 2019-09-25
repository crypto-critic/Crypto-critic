import { apiPrefix, userInfo } from '../endpoints';
import axios from 'axios';
import http from './http';

export const getUserInfo = (headers) => new Promise((res, rej) => {
    const opts = {
        method: 'get',
        headers,
        url: apiPrefix + userInfo.path
    };
    axios(opts)
        .then(result => res(result.data))
        .catch(err => rej(err))
});

// const email = 'son1234'
// const password = 'son1234'

//     http.client.authenticate({
//         stragety: 'local',
//         accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE1Njg5NTM1MjMsImV4cCI6MTU2OTAzOTkyMywiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNWQ4M2JlNGI2NmUzOTk2Yzk2MWNiYzAzIiwianRpIjoiZjFjN2EzYTktZmYyZS00ZDE1LTg0NzgtN2JlYzA4MDFlNjcyIn0.0d9U8kb6QFv62Xu1WtkbtX3pZGRLi8NRAl-7gd-ANZw'
//     }).then((data) => {
//     // console.log('data: ', data);
// })
http.client.service('users').find().then(data => console.log('users: ', data))
