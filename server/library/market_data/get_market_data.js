const coingecko = require('../market_data/markets/coingecko');
// const coinlib = require('../market_data/markets/coinlib');
// const cmc = require('../market_data/markets/cmc');
// const coinbaseurl = 'https://api.coinbase.com/v2/exchange-rates?currency=BTC';
// const coingeckourl = 'https://api.coingecko.com/api/v3/coins/bitcoin';

const get_data = (id) => new Promise((res, rej)=>{
    coingecko.get_coin(id).then(data => {
      if (data == null){
        console.log('Coinlib setup');
          console.log('CMC setup')
      } else {res(data)}
    })
});

module.exports = {
  get_data: get_data,
};