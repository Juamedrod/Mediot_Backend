const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const telegramUserSchema = new Schema({
    idTelegram: String,
    userId: String,
});

module.exports = mongoose.model('telegramUser', telegramUserSchema);