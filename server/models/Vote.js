var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var VoteSchema = new Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  vote: Boolean,
  coinId: {
    type: String,
    required: true,
    ref: 'List'
  },
});
module.exports = mongoose.model('Vote', VoteSchema);
