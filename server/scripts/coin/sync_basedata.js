const mongoose = require('mongoose');
const coin_db = require('../../library/database/coin_db');
const Coin = require('../../models/coin/Coin');
//COME ON
const sync_basedata = async (coin) => {
    let k = await require(`../../initial/coin/${coin}`).base;
    let check = await Coin.findOne({coinId : coin});
    if (check === null) {
        await Coin.create({
            _id: new mongoose.Types.ObjectId,
            coinId: coin,
            name: k.name,
            localization:  k.localization,
            category: k.category,
            about: k.about,
            active: k.active,
            links: k.links,
            genesis_date: k.genesis_date,
        })
    } else {
        return;
    }
};
module.exports = sync_basedata;
