const coinmodel = require('../models/coin/Coin');
const ListCoin = require('../models/ListCoin');

module.exports = (router)=>{
    //Get list of all coin
    router.get('/coins/list', (req, res) => {
        ListCoin.find({},(err, data)=>{
            if(data){
                res.status(200).json(data)
            }
        })
    });

    //Get market infomation of coin (home table render)
    router.get('/coins/markets', (req, res)=>{
        let id = req.query.id;
        let category = req.query.category;
        let vs_currency = req.query.vs_currency;
        if (!vs_currency || !category){
            res.status(404).json({message: 'error: Require vs_currency and category'})
        } else {
            coinmodel.find({category: category},(err, data)=>{
                if(data){
                    return res.status(200).json(
                        data.map(i=>{
                            return {
                                id: i.id,
                                name: i.name,
                                symbol: i.symbol,
                                current_price: i.market_data.current_price[vs_currency],
                                market_cap: i.market_data.market_cap[vs_currency],
                                total_volume: i.market_data.total_volume[vs_currency],
                                price_change_percentage_24h: i.market_data.price_change_percentage_24h,
                                roi: i.income_data.roi,
                                daily_income: [i.income_data.daily_income.coin, i.income_data.daily_income[vs_currency]],
                                masternode_worth: [i.income_data.masternode_worth.coin, i.income_data.masternode_worth[vs_currency]],
                                last_updated: i.last_updated,
                            }
                        }))
                }
            })
        }
    });
    router.get('/coins/:coin', (req, res)=>{
        let coin = req.params.coin;
        coinmodel.findOne({id: coin}, (err, i)=>{
            if (i==null){
                res.status(404).send('error: Could not find coin with given id')
            } else {
                res.status(200).json({
                    id: i.id,
                    name: i.name,
                    symbol: i.symbol,
                    category: i.category,
                    current_price: i.market_data.current_price,
                    market_cap: i.market_data.market_cap,
                    total_volume: i.market_data.total_volume,
                    high_24h: i.market_data.high_24h,
                    low_24h: i.market_data.low_24h,
                    price_change_24h: i.market_data.price_change_24h_in_currency,
                    price_change_percentage_24h: i.market_data.price_change_percentage_24h,
                    market_cap_change_24h: i.market_data.market_cap_change_24h_in_currency,
                    market_cap_change_percentage_24h: i.market_data.market_cap_change_percentage_24h,
                    current_supply: i.blockchain_data.current_supply,
                    total_supply: i.blockchain_data.total_supply,
                    roi: i.income_data.roi,
                    daily_income: i.income_data.daily_income,
                    weekly_income: i.income_data.weekly_income,
                    monthly_income: i.income_data.monthly_income,
                    yearly_income: i.income_data.yearly_income,
                    masternode_worth: i.income_data.masternode_worth,
                    last_updated: i.last_updated,                        
                });
            }
        })    
    })
};
