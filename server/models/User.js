const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
});
const User = mongoose.model('users', UserSchema);
module.exports = User;