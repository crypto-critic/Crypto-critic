require('module-alias/register');
var coin_array = require('@init/coin_array');
var chart = require('@lib/database/chart_db');
var data = require('@lib/income_data/get_income_data');
var chart_db = require('@lib/database/chart_db');
var market = require('@lib/market_data/get_market_data');
var blockchain = require('@lib/blockchain_data/get_blockchain_data');
var income = require('@lib/income_data/get_income_data');
var draw_market_data = (id) => new Promise((res, rej)=>{
    market.get_data(id).then(data=>{
        // console.log(data.market_data.current_price)
        chart_db.push_to_market_chart(id, data).then(()=>res('done'))
    })
});
var draw_blockchain_data = (id) => new Promise((res, rej)=>{
    blockchain.get_data(id).then(data => {
        chart_db.push_to_blockchain_chart(id, data).then(()=>res('done'))
    })
});
var draw_all_data = (id) => new Promise((res, rej) => {
    Promise.all([
        market.get_data(id),
        blockchain.get_data(id)
    ]).then(([market, blockchain])=>{
        Promise.all([
            income.get_income_data(blockchain, market).then(income =>{
                chart_db.push_to_income_chart(id, income)
            }),
            chart_db.push_to_blockchain_chart(id, blockchain),
            chart_db.push_to_market_chart(id, market)
        ]).then(()=>res('done'))
    })
});
Promise.all(coin_array.map(coin=>{
    if (coin.category == 'masternode'){
        draw_all_data(coin.id).then(()=>{})
    } else {
        Promise.all([
            draw_market_data(coin.id),
            draw_blockchain_data(coin.id)
        ]).then(()=>{})
    }
}));

