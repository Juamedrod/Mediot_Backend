const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const checkToken = async (req, res, next) => {

    if (!req.headers['auth']) return res.status(401).json({ error: "Invalid credentials" });

    try {
        const token = req.headers.auth;
        let tokenVerification = (jwt.verify(token, process.env.SECRET_KEY,));
        let user = await User.findById(tokenVerification.usuarioId);
        req.user = user;
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }

    next();
}

const checkRole = role => {
    return (req, res, next) => {
        if (req.user.role !== role) return res.status(403).json({ error: 'You need higher level access to perform that action' });
        next();
    }
}

module.exports = { checkToken, checkRole }