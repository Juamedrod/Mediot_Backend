/**
 * ROUTE: api/users
 */
const router = require('express').Router();
const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const { createToken, writeLog } = require('../../utils');
const { checkToken, checkRole } = require('../../middlewares/middlewares');


router.get('/', checkToken, (req, res) => {
    res.json(req.user);
});

//endpoint to verify the good signature of the token itself.
router.get('/checkin', checkToken, async (req, res) => {
    res.json({ auth: true });
});

router.post('/register', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const user = await User.create(req.body);
        const token = createToken(user, '5d');
        writeLog(user.id, 'register', 'register');
        res.json({ token })
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ error: 'Authentication error, credentials are not correct' });
        if (bcrypt.compareSync(req.body.password, user.password)) {
            writeLog(user.id, 'login', 'login');
            return res.json({ token: createToken(user, '5d') });
        } else {
            return res.status(401).json({ error: 'Authentication error, credentials are not correct' });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.delete('/', checkToken, async (req, res) => {
    try {
        await User.findOneAndRemove(req.user.id);
        res.json({ remove: true });
    } catch (error) {
        res.json({ remove: false });
    }
});

router.put('/', checkToken, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.json(user)
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;