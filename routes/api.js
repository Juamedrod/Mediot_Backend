const router = require('express').Router();
const devicesRouter = require('./api/devices');
const usersRouter = require('./api/users');
const blackboardRouter = require('./api/blackboard');
const logRouter = require('./api/log');
const { checkToken } = require('../middlewares/middlewares');

router.use('/devices', checkToken, devicesRouter);
router.use('/blackboard', checkToken, blackboardRouter);
router.use('/users', usersRouter);
router.use('/logs', checkToken, logRouter);

module.exports = router;