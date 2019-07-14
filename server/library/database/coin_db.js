const coinmodel = require('../../models/coin/Coin');
const List = require('../../models/ListCoin');

module.exports = {
    check_coin: (coin)=> new Promise((res,rej)=>{
        List.findOne({coinId: coin}, function(err, stats){
            if(stats) {
                res (true);
              } else {
                res (false);
            }
        });
    }),
    create_coin: (coin) => new Promise((res,rej)=>{
        var newCoin = new coinmodel({
            coinId: coin,
        });
        newCoin.save(function(err){
            if (!err) {
                res ('Insert ' + coin + ' to Coin database');
            } else {
                rej (err);
            }
        });
    }),
    update_basedata: (id, k) => new Promise((res,rej)=>{
        coinmodel.update(
            {coinId: id},
            {$set: {
                name: k.name,
                localization:  k.localization,
                category: k.category,
                about: k.about,
                active: k.active,
                links: k.links,
                genesis_date: k.genesis_date,
                }   
            }, function(){res ('Updated base data ' + id)}
        );
    }),
    get_coin: (coin) => new Promise((res, rej)=>{
        coinmodel.findOne(
            {coinId: coin}, (err, res)=>{
                if (err) {
                    rej (err)
                } else {
                    res (res)
                }
            }
        )
    }),
    update_market: (id, k) => new Promise((res, rej) => {
        coinmodel.update(
            {coinId: id},
            {$set: {
                market_data: k.market_data,
                community_data: k.community_data,
                developer_data: k.developer_data,
                last_updated: Date.now()
                }
            }, function(){res ('Updated marketdata ' + id)}
        );
    }),
    update_income: (id, income) => new Promise((res, rej) =>{
        coinmodel.update(
            {coinId: id},
            {$set: {
                income_data: income,
                }
            }, function(){res('Update incomedata' + id)}
        );
    }),
    update_blockchain: (id, blockchain) => new Promise((res, rej) => {
        coinmodel.update(
            {coinId: id},
            {$set: {
                blockchain_data: blockchain
                }   
            }, function(){}
        );
        res ('Updated blockchain data' + id)
    })
};