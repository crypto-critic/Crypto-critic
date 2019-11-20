import masternodeList from './data/masternodes.data.json';
import CollectionRestService from './collection-rest.service';
import { COINS, COIN_INFO } from '../constants/services.constant';
import axios from 'axios';

export const coinService = new CollectionRestService({ service: COINS });

export const coinInfoService = new CollectionRestService({ service: COIN_INFO });

export const getCryptocurrencyData = (query) => new Promise((res, rej) => {
    const { money, order } = query;
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${money}&order=${order}&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;
    axios.get(url)
    .then(result => {
            const { data } = result;
            res(data)
        })
});
