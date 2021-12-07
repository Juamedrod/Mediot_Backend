/**
 * ROUTE: api/devices
 */
const router = require('express').Router();
const Device = require('../../models/device.model');
const { writeLog } = require('../../utils');

router.get('/', async (req, res) => {
    try {
        const devices = await Device.find({ userId: req.user.id });
        res.json(devices);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newDevice = await Device.create({ ...req.body, userId: req.user.id });
        writeLog(req.user.id, 'newDevice', newDevice.dId);
        res.json(newDevice);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.put('/', async (req, res) => {
    try {
        const device = await Device.findByIdAndUpdate({ dId: req.body.dId }, req.body, { new: true });
        res.json(device)
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.post('/checkid', async (req, res) => {
    try {
        const devices = await Device.find({ dId: req.body.dId });
        if (devices.length === 0) {
            res.json({ avaliable: true });
        } else {
            res.json({ avaliable: false });
        }
    } catch (error) {
        console.log(error);
        res.json({ avaliable: false });
    }
});

router.delete('/:did', async (req, res) => {
    try {
        await Device.findOneAndRemove({ dId: req.params.did });
        res.json({ remove: true });
    } catch (error) {
        res.json({ remove: false });
    }
});

module.exports = router;