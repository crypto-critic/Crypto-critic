var coin_db = require('../../library/database/coin_db');
var market = require('../../library/market_data/get_market_data');
var sync_marketdata = (coin) => new Promise((res, rej) => {
    market.get_data(coin).then(res=>{
        // console.log(res);
        coin_db.update_market(coin, res);
    })
})
module.exports = sync_marketdata;
