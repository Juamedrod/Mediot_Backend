const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const displayConfigSchema = new Schema({
    userId: { type: String },
    dId: { type: String },
    displayType: { type: Number },
    displaySize: { type: String },
    maxDataRepresentation: { type: Number },
    refreshInterval: { type: Number },
    variableId: { type: String },
    variableName: { type: String },
    color: { type: String },
    backgroundColorRGBA: { type: String },
    chartName: { type: String },
    fillArea: { type: Boolean },
    tension: { type: String },
    borderWidth: { type: Number },
    colors: { type: [String] },
    scaleWithHover: { type: Number },
    createdAt: { type: Date, default: Date.now() }
})

const blackboardSchema = new Schema({
    userId: { type: String },
    arrConfig: [displayConfigSchema]
})

module.exports = mongoose.model('displayConfig', blackboardSchema);