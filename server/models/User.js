const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    //0: user, 1: coin_owner, 2: owner
    role: {
        type: Number,
        required: true,
        default: 0
    },
    walletIndex: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    wallet: [{
        coinId: {type: String, ref: 'List'},
        amount: {type: Number}
    }]
});
const User = mongoose.model('User', UserSchema);
module.exports = User;