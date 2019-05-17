require('module-alias/register');
var coin_db = require('@lib/database/coin_db');
var market = require('@lib/market_data/get_market_data');
var blockchain = require('@lib/blockchain_data/get_blockchain_data');
var income = require('@lib/income_data/get_income_data');
var sync_all_data = (coin) => new Promise((res, rej) => {
    income.get_all_data(coin).then(data => {
        Promise.all([
            coin_db.update_market(coin, data.market_data),
            coin_db.update_blockchain(coin, data.blockchain_data),
            coin_db.update_income(coin, data.income_data)
        ])
        .then(()=>res('done'))
        .catch(err => rej(err))
    })
    // market.get_data(coin).then(market=>{
    //     coin_db.update_market(coin, market);
    //     blockchain.get_data(coin).then(blockchain=>{
    //         coin_db.update_blockchain(coin, blockchain);
    //         // console.log(market.market_data.current_price)
    //         income.get_data(blockchain, market).then(income => {
    //             // console.log(income)
    //             coin_db.update_income(coin, income, function(){res('done')});
    //         })
    //     })
    // })
})
module.exports = sync_all_data;
