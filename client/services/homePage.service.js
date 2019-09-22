import masternodeList from './data/masternodes.data.json';
import axios from 'axios';
export const getHomePageData = (money) => new Promise((res, rej) => {
    const dataMock = data;
    const result = dataMock.find(item => item.money === money);
    res(result.data);
})

export const getCryptocurrencyData = (query) => new Promise((res, rej) => {
    const { money, order } = query;
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${money}&order=${order}&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;
    axios.get(url)
    .then(result => {
            const { data } = result;
            res(data)
        })
});

export const getMasternodeData = (money) => new Promise((res, rej) => {
    const list = masternodeList.join("%2C");
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${money}&ids=${list}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;
    axios.get(url)
        .then(result => {
            const { data } = result;
            data.map(item => {
                return Object.assign(item, {
                    ROI: 5,
                    masternodeCount: 100,
                    dailyIncome: item.current_price * 10,
                    masternodeWorth: item.current_price * 1000,
                })
            })
            res(data)
        })
})