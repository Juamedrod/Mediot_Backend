const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const booleanToggleSchema = new Schema({
    dId: { type: String },
    varName: { type: String },
    varValue: { type: Boolean },
    iat: { type: Date }
})

module.exports = mongoose.model('booleanToggle', booleanToggleSchema);