const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CoinSchema = new Schema({
  coinId: { type: String, unique: true, index: true },
  name: { type: String, default: '' },
  localization:  {type: Object, default: {}},
  category: { type: String, default: ''},
  about: {type: Object, default: {}},
  active: { type: Boolean, default: true },
  links: {type: Object, default: {}},
  genesis_date: {type: Date, default: null},
  blockchain_data: {type: Object, default: {}},
  market_data: {type: Object, default: {}},
  income_data: {type: Object, default: {}},
  community_data: {type: Object, default: {}},
  developer_data: {type: Object, default: {}},
  last_updated: {type: Date}
});

module.exports = mongoose.model('coins', CoinSchema);
