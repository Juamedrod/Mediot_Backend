/**
 * ROUTE: api/data
 */
const router = require('express').Router();
const Data = require('../../models/data.model');
const BooleanToggle = require('../../models/booleanToggle.model');
const { checkToken } = require('../../middlewares/middlewares');

/** Last Snapshot */
router.get('/:dId', checkToken, async (req, res) => {
    try {
        const data = await Data.find({ dId: req.params.dId }).sort({ _id: -1 }).limit(1);
        res.json(data[0]);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/:dId/:limit', checkToken, async (req, res) => {
    try {
        const data = await Data.find({ dId: req.params.dId }).sort({ _id: -1 }).limit(parseInt(req.params.limit));
        res.json(data);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.post('/:dId', async (req, res) => {
    try {
        req.body.iat = new Date();
        const data = await Data.create(req.body);
        res.json({ res: 'Success!' });
    } catch (error) {
        res.json({ error: error.message });
    }
});

/**
 *  Create an endpoint for a boolean switch variable
 */
router.post('/boolean/:dId/:variable', async (req, res) => {
    try {
        const response = await BooleanToggle.findOne({ dId: req.params.dId, varName: req.params.variable });
        if (response) return res.json({ res: 'Already Exist in DB' });
        req.body.iat = new Date();
        await BooleanToggle.create({ ...req.body, dId: req.params.dId, varName: req.params.variable });
        res.json({ res: 'Success!' });
    } catch (error) {
        res.json({ error: error.message });
    }
});

/**
 * Update the value of the switch variable
 */
router.put('/boolean/:dId/:variable', async (req, res) => {
    try {
        req.body.iat = new Date();
        await BooleanToggle.findOneAndUpdate({ dId: req.params.dId, varName: req.params.variable }, req.body);
        res.json({ res: 'Success!' });
    } catch (error) {
        res.json({ error: error.message });
    }
});

/**
 * Retrieve the state of the boolean Variable
 */
router.get('/boolean/:dId/:variable', async (req, res) => {
    try {
        req.body.iat = new Date();
        const booleanToggle = await BooleanToggle.findOne({ dId: req.params.dId, varName: req.params.variable });
        res.send(booleanToggle.varValue);
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;