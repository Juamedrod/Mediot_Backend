/**
 * ROUTE: api/users
 */
const router = require('express').Router();
const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../utils');
const { checkToken, checkRole } = require('../../middlewares/middlewares');


router.get('/', checkToken, checkRole('admin'), async (req, res) => {
    const devices = await User.find();
    res.json(devices);
});

//endpoint to verify the good signature of the token itself.
router.get('/checkin', checkToken, async (req, res) => {
    console.log('token correcto');//BORRAR BORRAR BORRAR
    res.json({ auth: true });
});

router.post('/register', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const response = await User.create(req.body);
        const token = createToken(response, '5d');
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
            return res.json({ token: createToken(user, '5d') });
        } else {
            return res.status(401).json({ error: 'Authentication error, credentials are not correct' });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.delete('/', checkToken, async (req, res) => {
    res.send('user llego mostro');
});

router.put('/', checkToken, async (req, res) => {
    res.send('user llego mostro');
});

module.exports = router;