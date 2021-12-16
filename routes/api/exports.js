/**
 * ROUTE: API/EXPORTS
 */
const router = require('express').Router();
const { checkToken } = require('../../middlewares/middlewares');
const Data = require('../../models/data.model');
const Device = require('../../models/device.model');
const { createCSV } = require('../../utils');
const fs = require('fs');

router.get('/:dId/:var', async (req, res) => {
    try {
        const random = Math.random() * 90000;
        console.log(req.query.limit);
        const snapshot = await Data.find({ dId: req.params.dId }).sort({ _id: -1 }).limit(parseInt(req.query.limit));
        let csv = await createCSV(snapshot, ['_id', 'dId', 'iat', `variables.${req.params.var}`], true);
        console.log('He llegado aquí');
        const writeStream = fs.createWriteStream(`./public/csv/${req.params.dId}${random}.csv`, { flags: 'w' });
        console.log('he creado el fichero');
        writeStream.write(csv);
        writeStream.end();
        res.json({ url: `csv/${req.params.dId}${random}.csv` });
        new setTimeout(async function () {
            try {
                fs.rm(`./public/csv/${req.params.dId}${random}.csv`, (error) => {
                    if (error) throw error;
                });
            } catch (error) {
                console.log({ error: error.message });
                res.json({ error: error.message });
            }
        }, 20000);
    } catch (error) {
        console.log({ error: error.message });
        res.json({ error: error.message });
    }
});

module.exports = router;