var coin_db = require('@lib/database/coin_db');
var coin_array = require('@init/coin_array');
var sync_coin = (coin)=>new Promise((res, rej) => {
    coin_db.check_coin(coin).then(result=>{
        if (result==true){
            Promise.all([
                require('./sync_basedata')(coin),
                require('./sync_marketdata')(coin),
            ]).then(()=>res('sync done'))
        } else {res('done')}
    })
})
var sync_masternode_coin = (coin)=>new Promise((res, rej) => {
    coin_db.check_coin(coin).then(result=>{
        if (result==true){
            Promise.all([
                require('./sync_basedata')(coin),
                require('./sync_all_data')(coin)
            ]).then(()=>res('sync done'))
        } else {res('not avaiable')}
    })
})
module.exports = () => {
    setInterval(()=>{
        Promise.all(coin_array.map(coin=>{
                if (coin.category == 'masternode'){
                    sync_masternode_coin(coin.id)
                } else {
                    sync_coin(coin.id)
                }
        }))
    }, 5000)
}
