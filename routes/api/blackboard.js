/**
 * ROUTE: api/blackboard
 */
const router = require('express').Router();
const Display = require('../../models/blackboard.model');

router.get('/', async (req, res) => {
    try {
        const displays = await Display.find({ userId: req.user.id });
        res.json(displays);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newDisplay = await Display.create({ arrConfig: req.body, userId: req.user.id });
        res.json(newDisplay);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.put('/', async (req, res) => {
    try {
        console.log(req.body);
        const display = await Display.findOneAndUpdate({ dId: req.body.dId }, { arrConfig: req.body, userId: req.user.id }, { new: true });
        console.log(display);
        res.json(display)
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.delete('/:did', async (req, res) => {
    try {
        await Display.findOneAndRemove({ dId: req.params.did });
        res.json({ remove: true });
    } catch (error) {
        res.json({ remove: false });
    }
});

module.exports = router;