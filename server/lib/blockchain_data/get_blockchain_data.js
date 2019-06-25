require('babel-polyfill')
require('module-alias/register');
var coin_array = require('@init/coin_array');
var getlink = require('@lib/blockchain_data/get_blockchain_links');
var axios = require('axios');

var getmasternodecount = async (link) => {
    var data = await axios.get(link);
    return data.data.total;
}
var getmoneysupply = async (link) => {
    var data = await axios.get(link);
    return data.data;
}
var getdifficulty = async (link) => {
    var data = await axios.get(link);
    return data.data;
}
var getconnectioncount = async (link) => {
    var data = await axios.get(link);
    return data.data;
}
var getblockcount = async (link) => {
    var data = await axios.get(link);
    return data.data;
}
var getblocktime = async () => {
    return 1;
}
var getblockreward = async () => {
    return 10;
}
var gettotalsupply = async () => {
    return 1000000;
}
var getcurrentcollateral = async () => {
    return 1000;
}
var getcurrentratio = async () => {
    return 0.8;
}
var get_data = (coin) => new Promise((res, rej) =>{
    getlink(coin).then(coin =>{
        Promise.all([
            getblockcount(coin.getblockcount),
            getblocktime(),
            getblockreward(),
            gettotalsupply(),
            getcurrentcollateral(),
            getcurrentratio(),
            getmasternodecount(coin.getmasternodecount),
            getmoneysupply(coin.getmoneysupply),
            getdifficulty(coin.getdifficulty)
        ])
        .then(([
            current_block,
            block_time_in_minuntes,
            block_reward,
            total_supply,
            current_collateral,
            current_ratio,
            current_mn,
            current_supply,
            difficulty
        ]) => res({
            current_block: current_block,
            block_time_in_minuntes: block_time_in_minuntes,
            block_reward: block_reward,
            total_supply: total_supply,
            current_collateral: current_collateral,
            current_ratio: current_ratio,
            current_mn: current_mn,
            current_supply: current_supply,
            difficulty: difficulty
        }))
        .catch(err => rej(err))
    })
})
var get_all_data = () => new Promise((res, rej) =>{
    Promise.all(coin_array.map(i => get_data(i.id)))
    .then(data => res(data))
    .catch(err => rej(err))
})
module.exports = {
    get_data: get_data,
    get_all_data: get_all_data
};
// get_data('99masternodes').then(data=>console.log(data))