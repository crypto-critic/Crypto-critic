var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var VoteSchema = new Schema({
  userId: {
    type: String,
    required: true,
    ref: 'users'
  },
  vote: Boolean,
  coinId: {
    type: String,
    required: true,
    ref: 'list'
  },
});
module.exports = mongoose.model('votes', VoteSchema);
