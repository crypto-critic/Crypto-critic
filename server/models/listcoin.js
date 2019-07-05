const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ListSchema = new Schema({
    id: { type: String, unique: true, index: true },
    name: { type: String},
    active: { type: Boolean, default: true },
    category: { type: String}
});

const List = mongoose.model('lists', ListSchema);

module.exports = List;