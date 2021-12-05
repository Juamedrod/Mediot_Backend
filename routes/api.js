const router = require('express').Router();
const devicesRouter = require('./api/devices');
const usersRouter = require('./api/users');

router.use('/devices', devicesRouter);
router.use('/users', usersRouter);

module.exports = router;