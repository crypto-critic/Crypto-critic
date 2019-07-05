var mongoose = require('mongoose');
var dbString = 'mongodb://localhost:27017/myapp';
mongoose.connect(dbString, { useNewUrlParser: true });
var coin_db = require('../../library/database/coin_db');
var listmodel = require('../../models/listcoin');

var coin_array = require('../../initial/coin_array');
var sync_coin = (coin) => new Promise((res, rej) => {
    coin_db.check_coin(coin).then(result=>{
        if (result==true){
            Promise.all([
                require('./sync_basedata')(coin),
                require('./sync_marketdata')(coin),
            ]).then(() => res('sync done'))
        } else {res('done')}
    })
});
var sync_masternode_coin = (coin)=>new Promise((res, rej) => {
    coin_db.check_coin(coin).then(result => {
        if (result==true){
            Promise.all([
                require('./sync_basedata')(coin),
                require('./sync_all_data')(coin)
            ]).then(()=>res('sync done'))
        } else {res('not avaiable')}
    })
});

var sync = async () => {
    var list = await listmodel.find({});
};

Promise.all(coin_array.map(coin=>{
    var res = require(`./server/initial`).base;
    if (res.category == 'masternode'){
        sync_masternode_coin(res.id)
    } else {
        sync_coin(res.id)
    }
}));