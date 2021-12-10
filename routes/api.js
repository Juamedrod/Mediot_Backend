const router = require('express').Router();
const devicesRouter = require('./api/devices');
const usersRouter = require('./api/users');
const blackboardRouter = require('./api/blackboard');
const logRouter = require('./api/log');
const dataRouter = require('./api/data');
const exportsRouter = require('./api/exports');
const { checkToken } = require('../middlewares/middlewares');


router.use('/devices', checkToken, devicesRouter);
router.use('/blackboard', checkToken, blackboardRouter);
router.use('/users', usersRouter);
router.use('/data', dataRouter);
router.use('/logs', checkToken, logRouter);
router.use('/exports', exportsRouter);

module.exports = router;