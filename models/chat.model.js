const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    userId: { type: String },
    userName: { type: String },
    message: { type: String }
})

const chatSchema = new Schema({
    userId: { type: String },
    userName: { type: String },
    topic: { type: String },
    messages: [messageSchema]
})

module.exports = mongoose.model('chat', chatSchema);