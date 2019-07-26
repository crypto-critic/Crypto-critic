var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var VoteSchema = new Schema({
  email: {
    type: String,
    required: true,
    ref: 'users'
  },
  vote: Boolean,
  coinId: {
    type: String,
    required: true,
    ref: 'lists'
  },
});
module.exports = mongoose.model('votes', VoteSchema);
