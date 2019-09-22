import { observable, action, computed, observe } from 'mobx';
import GlobalStore from '../../stores/global.store';
const axios = require('axios');

const getData = async (id, vs_currency) => {
    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d`;
    let res = await axios.get(url);
    let point = await getCoordinates(res.data[0].sparkline_in_7d.price, 320, 70);
    return Object.assign({
        id: id,
        price: res.data[0].current_price,
        change: res.data[0].price_change_percentage_24h.toFixed(2),
    }, point);
};

const getCoordinates = async (values, width, height) => {
    let min = Math.min(...values);
    let max = Math.max(...values);
    let yRatio = ( max - min ) / height;
    let xRatio = width / ( values.length - 2 );
    let result = values.map(function( value, i ) {
        let y = height - ( ( value - min ) / yRatio );
        let x = ( xRatio * i ) - ( xRatio / 2 );
        return [x,y]
    });
    return await {point: result.toString().split(",").join(' ')};
};

const array = [
    {
        title: 'Top Marketcap',
        id: 'bitcoin'
    },
    {
        title: 'Top Marketcap',
        id: 'bitcoin'
    },
    {
        title: 'Top Marketcap',
        id: 'bitcoin'
    },
    {
        title: 'Top Marketcap',
        id: 'bitcoin'
    },
    {
        title: 'Top Marketcap',
        id: 'bitcoin'
    },
]

class CardIndexStore {
    constructor(array) {
        this.arrayOfCoin = array;
        this.getData = getData;
        this.money = GlobalStore.money;
        this.initData();
        observe(this, 'newmoney', () => {
            this.initData();
        })
        console.log(this.data)
    }

    @observable data = [];

    @action initData = async () => {
        let result0 = await getData(this.arrayOfCoin[0].id, this.money);
        this.data.push(result0)
    }

    @computed get newmoney() {
        return GlobalStore.money;
    }
}

const Store = new CardIndexStore(array)

export default Store;