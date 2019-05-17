require('module-alias/register');
var coin_db = require('@lib/database/coin_db');
var get_market_data = require('@lib/income_data/get_market_data');
var sync_marketdata = (coin) => new Promise((res, rej) => {
    get_market_data(coin).then(res=>{
        // console.log(res);
        coin_db.update_market(coin, res);
    })
})
module.exports = sync_marketdata;