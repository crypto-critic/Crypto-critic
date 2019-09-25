import axios from 'axios';

export const getCoinPageData = (id) => new Promise((res, rej) => {
    const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=true&sparkline=true`;
    axios.get(url)
        .then(result => {
            const { data } = result;
            res(data)
        })
})