const router = require('express').Router();
const devicesRouter = require('./api/devices');
const usersRouter = require('./api/users');
const { checkToken } = require('../middlewares/middlewares');

router.use('/devices', checkToken, devicesRouter);
router.use('/users', usersRouter);

module.exports = router;