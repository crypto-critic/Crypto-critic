const mongoose = require('mongoose');
const dbString = 'mongodb://localhost:27017/myapp';
mongoose.connect(dbString, { useNewUrlParser: true });
const ListCoin = require('../../models/ListCoin');
const Coin = require('../../models/coin/Coin');
const coin_db = require('../../library/database/coin_db');

const sync_coin = async (coin) => {
    let check = await ListCoin.findOne({coinId: coin});
    if (check !== null){
        Promise.all([
            require('./sync_basedata')(coin),
            // require('./sync_marketdata')(coin),
        ])
    }
};

const sync_masternode_coin = async (coin) => {
    let check = await ListCoin.findOne({coinId: coin});
    if (check !== null){
        Promise.all([
            require('./sync_basedata')(coin),
            require('./sync_all_data')(coin)
        ])
    }
};

const sync = async () => {
    let List = await ListCoin.find({});
    await Promise.all(List.map(async (coin) => {
        if (coin.category ==='masternode'){
            await sync_masternode_coin(coin.coinId);
        } else {
            await sync_coin(coin.coinId);
        }
    }));
};

sync();
