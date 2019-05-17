require('module-alias/register');
var coin_array = require('@init/coin_array');
var getlink = require('@lib/blockchain_data/get_blockchain_links');
var axios = require('axios');

var getmasternodecount = (link) => new Promise((res,rej)=>{
    axios.get(link)
    .then((data)=>{
        res(data.data.total)
    })
    .catch((err)=>rej(err))
    ;
})
var getmoneysupply = (link) => new Promise((res,rej)=>{
    axios.get(link)
    .then((data)=>{
        res(data.data)
    })
    .catch((err)=>rej(err))
    ;
})
var getdifficulty = (link) => new Promise((res,rej)=>{
    axios.get(link)
    .then((data)=>{
        res(data.data)
    })
    .catch((err)=>rej(err))
    ;
})
var getconnectioncount = (link) => new Promise((res,rej)=>{
    axios.get(link)
    .then((data)=>{
        res(data.data)
    })
    .catch((err)=>rej(err))
    ;
})
var getblockcount = (link) => new Promise((res,rej)=>{
    axios.get(link)
    .then((data)=>{
        res(data.data)
    })
    .catch((err)=>rej(err))
    ;
})
var getblocktime = () => new Promise((res,rej)=>{
    res(1)
})
var getblockreward = () => new Promise((res,rej)=>{
    res(10)
})
var gettotalsupply = () => new Promise((res,rej)=>{
    res(1000000)
})
var getcurrentcollateral = () => new Promise((res,rej)=>{
    res(1000)
})
var getcurrentratio = () => new Promise((res,rej)=>{
    res(0.8)
})
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