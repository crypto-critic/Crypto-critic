var coin_db = require('../../library/database/coin_db');
var get = require('../../initial/get_base');

//COME ON
var sync_basedata = (coin) => new Promise((res, rej)=>{
    get(coin).then(res=>{
        coin_db.update_basedata(coin, res.base).then(()=>{
        })
    });
    res({});
});
module.exports = sync_basedata;