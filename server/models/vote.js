var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var VoteSchema = new Schema({
  ip: String,
  vote: Boolean,
  coin_id: String,
});
module.exports = mongoose.model('vote', VoteSchema);
