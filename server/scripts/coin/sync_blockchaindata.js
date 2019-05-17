require('module-alias/register');
var coin_db = require('@lib/database/coin_db');
var blockchain = require('@lib/blockchain_data/get_blockchain_data');
var sync_blockchaindata = (coin) => new Promise((res, rej) => {
    blockchain.get_data(coin).then(res=>{
        console.log(res);
        coin_db.update_blockchain(coin, res);
    })
})
module.exports = sync_blockchaindata;
sync_blockchaindata('99masternodes')