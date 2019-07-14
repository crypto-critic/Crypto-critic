require('babel-polyfill');
const axios = require('axios');

const getmasternodecount = async (link) => {
    let data = await axios.get(link);
    return data.data.total;
};
const getcurrentsupply = async (link) => {
    let data = await axios.get(link);
    return data.data.t;
};
const getdifficulty = async (link) => {
    let data = await axios.get(link);
    return data.data;
};
const getconnectioncount = async (link) => {
    let data = await axios.get(link);
    return data.data;
};
const getblockcount = async (link) => {
    let data = await axios.get(link);
    return data.data;
};
const getblocktime = async (link) => {
    let data = await axios.get(link);
    return data.data.blocktime/60;
};
const getblockreward = async (link) => {
    let data = await axios.get(link);
    return data.data.blockreward;
};
const gettotalsupply = async (link) => {
    let data = await axios.get(link);
    return data.data.totalsupply;
};
const getcurrentcollateral = async (link) => {
    let data = await axios.get(link);
    return data.data.collateral;
};
const getcurrentratio = async (link) => {
    let data = await axios.get(link);
    return data.data.mnratio;
};
const getBlockchainData = async (coin) => {
    let host = await require(`../../initial/coin/${coin}.js`).host;
    console.log(host);
    let result =  {
        current_block: await getblockcount(host + 'getblockcount'),
        block_time_in_minuntes: await getblocktime(host + 'chainblocktime'),
        block_reward: await getblockreward(host + 'chainblockreward'),
        total_supply: await gettotalsupply(host + 'totalsupply'),
        current_collateral: await getcurrentcollateral(host + 'collateral'),
        current_ratio: await getcurrentratio(host + 'chainmasternoderatio'),
        current_mn: await getmasternodecount(host + 'masternodecount'),
        current_supply: await getcurrentsupply(host + 'currentsupply'),
        difficulty: await getdifficulty(host + 'getdifficulty')
    };
    return result;
};

module.exports = {
    get_data: getBlockchainData
    // get_all_data: get_all_data
};
