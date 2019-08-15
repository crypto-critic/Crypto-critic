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
    role: {
        type: Number,
        required: true,
        default: 0
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
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