require('module-alias/register');
var coin_db = require('@lib/database/coin_db');
var market = require('@lib/market_data/get_market_data');
var sync_marketdata = (coin) => new Promise((res, rej) => {
    market.get_data(coin).then(res=>{
        // console.log(res);
        coin_db.update_market(coin, res);
    })
})
module.exports = sync_marketdata;
