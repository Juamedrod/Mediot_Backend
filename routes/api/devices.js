/**
 * ROUTE: api/devices
 */
const router = require('express').Router();
const Device = require('../../models/device.model');

router.get('/', async (req, res) => {
    const devices = await Device.find();
    res.json(devices);
});

router.post('/', async (req, res) => {
    res.send('aqui llego mostro');
});

router.delete('/', async (req, res) => {
    res.send('aqui llego mostro');
});

router.put('/', async (req, res) => {
    res.send('aqui llego mostro');
});

module.exports = router;