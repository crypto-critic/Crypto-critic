var coin_db = require('../../library/database/coin_db');
var blockchain = require('../../library/blockchain_data/get_blockchain_data');
var sync_blockchaindata = (coin) => new Promise((res, rej) => {
    blockchain.get_data(coin).then(res=>{
        console.log(res);
        coin_db.update_blockchain(coin, res);
    })
});
module.exports = sync_blockchaindata;