const { Markup, Telegram } = require('telegraf');
const TelegramUser = require('../models/telegramUser.model');
const Device = require('../models/device.model');

const device = async (ctx) => {
    try {
        const dId = ctx.message.text.split('/device')[1].trim();
        const device = await Device.findOne({ userId: ctx.userId, dId: dId });
        if (!device) return ctx.reply('This device doesnt exist or is not of your own');
        await ctx.replyWithHTML(`<strong>Device ID:</strong> : <strong>${device.dId}</strong>`);
        await ctx.replyWithHTML(`<strong>Device Name:</strong> : <strong>${device.nickname}</strong>`);
        await ctx.replyWithHTML(`<strong>Device description:</strong> : <strong>${device.description}</strong>`);
        const buttons = []
        for (const variable of device.variables) {
            buttons.push(new Markup.button.callback(variable, dId + '-' + variable))
        }
        await ctx.reply('Do you want a snapshot of any of your variables?', Markup.inlineKeyboard(buttons));

    } catch (error) {
        console.log({ error: error.message });
        ctx.reply('Something went wrong with your request')
    }
}

module.exports = device;