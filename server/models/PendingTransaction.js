const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PendingTransactionSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
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
    startTime: {
        type: Date,
        required: true,
    },
    stopTime: {
        type: Date,
        required: true,
    }
});
const PendingTransaction =  mongoose.model('pendingTransactions', PendingTransactionSchema);
module.exports = PendingTransaction;