import axios from 'axios';

export const getInfo = (coinId) => new Promise((res, rej) => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`;
    axios.get(url).then(result => {
        res(result.data)
    })
});

export const getLast100Txs = (coinId) => new Promise((res, rej) => {
    const url = 'https://explorer.energi.network/ext/getlasttxs/10/100';
    axios.get(url).then(result => {
        res(result.data.data)
    })
});

export const getBlock = (hash) => {
    const url = `https://explorer.energi.network/api/getblock?hash=${hash}`;
    axios.get(url).then(result => {
        res(result.data)
    })
};