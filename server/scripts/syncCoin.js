const mongoose = require('mongoose');
const dbString = 'mongodb://localhost:27017/myapp';
const axios = require('axios');
// const fetch = req

mongoose.connect(dbString, { useNewUrlParser: true });

const ListCoin = require('../models/ListCoin');
const Coin = require('../models/Coin');

const sync = async (coin) => {
    let { coinId, host, vpsIndex } = coin;
    let marketUrl = `http://${host}:3001/api/${coinId}/marketdata`;
    let chainUrl = `http://${host}:3001/api/${coinId}/chaindata`;
    let market = await axios.get(marketUrl);
    let chain = await axios.get(chainUrl);
    let market_data = market.data.market_data;
    let income_data = market.data.income_data;
    let blockchain_data = chain.data;
    Coin.findOneAndUpdate(
        {coinId},
        {$set: {
            market_data,
            income_data,
            blockchain_data,
            last_updated: Date.now()
        }},
        {
            upsert: true
        }
    )
};

const syncCoin = () => ListCoin.find({}, (err, data) => {
    if(data !== null) {
        data.map(coin => {
            syncCoin(coin.coinId);
        });
    }
});

module.exports = syncCoin;