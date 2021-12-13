const { Telegraf } = require('telegraf');
const TelegramUser = require('./models/telegramUser.model');
const { userIsRegisteredInTelegram } = require('./utils');
const Data = require('./models/data.model');

require('dotenv').config();

/**
 * BOT TELEGRAM
 */
const bot = new Telegraf(process.env.BOT_TOKEN);
// create webhook for the book to keep listening the endpoint
bot.telegram.setWebhook(process.env.BOT_URL + '/secret-path');

/**
 * Middlewares to check if user is registered
 */
const isAuthedTelegram = (async (ctx, next) => {
    currentUserTelegram = await TelegramUser.findOne({ idTelegram: ctx.from.id });
    if (currentUserTelegram) {
        ctx.userId = currentUserTelegram.userId;
        await next()
    } else {
        ctx.reply('You are not registered in Mediot, Register first if you want to use our services');
        await next()
    }
});

/**
 * BOT TELEGRAM COMMAND
 */
bot.command('register', require('./commands/register'));
bot.command('devices', isAuthedTelegram, require('./commands/devices'));
bot.command('device', isAuthedTelegram, require('./commands/device'));

bot.action(/.+/, async (ctx) => {
    const split = ctx.callbackQuery.data.split('-');
    const response = await Data.findOne({ dId: split[0] }).sort({ _id: -1 }).limit(1);
    return ctx.reply(`${split[1]} : ${response.variables[split[1]]}`);
});

module.exports = { bot };