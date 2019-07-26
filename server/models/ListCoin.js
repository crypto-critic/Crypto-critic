const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ListSchema = new Schema({
    coinId: { type: String, unique: true, index: true },
    host: { type: String},
    vpsIndex: { type: Number},
});

const List = mongoose.model('lists', ListSchema);

module.exports = List;