const TelegramUser = require('../models/telegramUser.model');
const Device = require('../models/device.model');

const devices = async (ctx) => {
    try {
        const devices = await Device.find({ userId: ctx.userId });
        const arrDevicesNameAndID = []
        if (devices.length == 0) return ctx.reply('you have not devices registered in Mediot');
        for (let device of devices) {
            await ctx.replyWithHTML(`Your device name is <strong>${device.nickname}</strong> with and dId: <strong>${device.dId}</strong>`);
        }
    } catch (error) {
        ctx.reply('Something went wrong with your request')
    }
}

module.exports = devices;