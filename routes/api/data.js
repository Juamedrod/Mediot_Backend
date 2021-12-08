/**
 * ROUTE: api/data
 */
const router = require('express').Router();
const Data = require('../../models/data.model');
const { checkToken } = require('../../middlewares/middlewares');

router.get('/:dId', checkToken, async (req, res) => {
    try {
        const data = await Data.find({ dId: req.params.dId }).sort({ _id: -1 }).limit(1);
        res.json(data[0]);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.post('/:dId', async (req, res) => {
    try {
        req.body.iat = new Date();
        console.log(req.body);//DELETEEEEE
        const data = await Data.create(req.body);
        res.json({ res: 'Exito!' });
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;