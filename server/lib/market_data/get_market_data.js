require('module-alias/register');
var coingecko = require('@lib/market_data/markets/coingecko');
var coinlib = require('@lib/market_data/markets/coinlib');
var cmc = require('@lib/market_data/markets/cmc');
var coin_array = require('@init/coin_array');
var coinbaseurl = 'https://api.coinbase.com/v2/exchange-rates?currency=BTC';
var coingeckourl = 'https://api.coingecko.com/api/v3/coins/bitcoin';

var get_data = (id) => new Promise((res, rej)=>{
    coingecko.get_coin(id).then(data => {
      if (data == null){
        console.log('thuc hien coinlib')
      } else {res(data)}
    })
})

module.exports = {
  get_data: get_data,
};