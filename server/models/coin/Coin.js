const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CoinSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, unique: true},
  coinId: { type: String, unique: true, index: true },
  name: { type: String, default: '' },
  localization:  {type: Object, default: {}},
  category: { type: String, default: ''},
  about: {type: Object, default: {}},
  active: { type: Boolean, default: true },
  links: {
    homepage: { type: Array, default: null },
    annoucement: { type: Array, default: null },
    discord: { type: Array, default: null },
    twitter: { type: Array, default: null },
    telegram: { type: Array, default: null },
    facebook: { type: Array, default: null },
    youtube: { type: Array, default: null },
    explorer: { type: Array, default: null },
    github: { type: Array, default: null },
    reddit:{ type: Array, default: null }
  },
  genesis_date: {type: Date, default: null},
  blockchain_data: {type: Object, default: {}},
  market_data: {type: Object, default: {}},
  income_data: {type: Object, default: {}},
  community_data: {type: Object, default: {}},
  developer_data: {type: Object, default: {}},
  last_updated: Date
});

module.exports = mongoose.model('coins', CoinSchema);
