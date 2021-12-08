const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    dId: { type: String },
    variables: { type: mongoose.Mixed }
})

module.exports = mongoose.model('data', dataSchema);