const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    coinId: {
        type: String,
        required: true,
        ref: 'list'
    },
    from: {
        type: String,
        required: true,
        ref: 'users'
    },
    to: {
        type: String,
        required: true,
        ref: 'users'
    },
    amount: {
        type: Number,
        required: true,
    },
});
const Transaction =  mongoose.model('transactions', TransactionSchema);
module.exports = Transaction;