/**
 * ROUTE: api/logs
 */
const router = require('express').Router();
const { readLog, writeLog } = require('../../utils');

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

router.post('/', async (req, res) => {
    try {
        //recuerda que el id viene en req.user.id
        console.log(req.body);
        writeLog(req.user.id, req.body.key, req.body.value);
        res.json({ success: 'success' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al escribir el log' });
    }
});

module.exports = router;