const router = require('express').Router();
const devicesRouter = require('./api/devices');

router.use('/devices', devicesRouter);

module.exports = router;