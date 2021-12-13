const TelegramUser = require('../models/telegramUser.model');

const handleTelegramRegister = async (ctx) => {
    try {
        if (await TelegramUser.exists({ idTelegram: ctx.from.id })) {
            ctx.reply('This Telegram user is already registered in MedIoT systems.')
        } else {
            const userId = ctx.message.text.split('/register')[1].trim();
            const user = { idTelegram: ctx.from.id, userId: userId };
            await TelegramUser.create(user);
            ctx.reply('This Telegram user has been registered with success! Gratz!')
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = handleTelegramRegister;