const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    walletIndex: {
        type: Number,
        required: true,
        unique: true
    },
    wallet: [{
        _id: false,
        coinId: {type: String, ref: 'lists'},
        address: {type: String},
        balance: {type: Number},
        active: {type: Number},
        lock: {type: Number}
    }]
});
const User = mongoose.model('user-wallets', UserSchema);
module.exports = User;