const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    deviceType: { type: String, required: true },
    userId: { type: String, required: true },
    dId: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    nickname: { type: String, required: true },
    variables: [String],
    createdAt: { type: Date, default: Date.now() }
})

deviceSchema.plugin(uniqueValidator, { message: 'Device Id have to be unique, try again.' });
module.exports = mongoose.model('device', deviceSchema);