/**
 * ROUTE: API/EXPORTS
 */
const router = require('express').Router();
const { checkToken } = require('../../middlewares/middlewares');
const Data = require('../../models/data.model');
const Device = require('../../models/device.model');
const { createCSV } = require('../../utils');
const fs = require('fs');

router.get('/:dId/:var', checkToken, async (req, res) => {
    try {
        const random = Math.random() * 90000;
        const snapshot = await Data.find({ dId: req.params.dId }).sort({ _id: -1 }).limit(5);
        let csv = await createCSV(snapshot, ['_id', 'dId', 'iat', `variables.${req.params.var}`], true);
        const writeStream = fs.createWriteStream(`./public/csv/${req.params.dId}${random}.csv`, { flags: 'w' });
        writeStream.write(csv);
        writeStream.end();
        res.json({ url: `csv/${req.params.dId}${random}.csv` });
        setTimeout(async function () {
            try {
                fs.rm(`./public/csv/${req.params.dId}${random}.csv`, (error) => {
                    if (error) throw error;
                });
            } catch (error) {
                res.json({ error: error.message });
            }
        }, 30000);
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;