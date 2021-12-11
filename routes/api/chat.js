/**
 * ROUTE: api/chat
 */
const router = require('express').Router();
const Chat = require('../../models/chat.model');

router.get('/', async (req, res) => {
    try {
        const data = await Chat.find();
        res.json(data);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newChat = await Chat.create({
            topic: req.body.message,
            userName: req.user.name,
            userId: req.user._id,
            messages: []
        });
        res.json(newChat);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.put('/', async (req, res) => {
    try {
        const newChat = await Chat.findOneAndUpdate({ _id: req.query.chatId }, { $push: { messages: { message: req.body.message, userId: req.user._id, userName: req.user.name } } }, { returnOriginal: false });
        res.json(newChat);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.delete('/:chatId', async (req, res) => {
    try {
        await Chat.findOneAndDelete({ _id: req.params.chatId });
        res.json(chatDeleted);
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;