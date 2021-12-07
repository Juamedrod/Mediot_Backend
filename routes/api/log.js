const router = require('express').Router();
const { readLog } = require('../../utils');

router.get('/', async (req, res) => {
    try {
        //recuerda que el id viene en req.user.id
        const log = await readLog(req.user.id);
        res.json(log);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al leer el log' });
    }
});

module.exports = router;