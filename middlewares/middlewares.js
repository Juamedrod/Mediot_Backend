const jwt = require('jsonwebtoken');
const { getByID } = require('../../models/usuario.model');

const checkToken = async (req, res, next) => {
    //comprobar si el token viene incluido en la peticion    
    if (!req.headers['auth']) return res.status(401).json({ error: "Invalid credentials" });
    //tengo token ahora miro si es válido
    try {
        const token = req.headers.auth;
        let tokenVerification = (jwt.verify(token, process.env.SECRET_KEY,));
        let user = await getByID(tokenVerification.usuarioId);
        req.user = user;
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
    next();
}

const checkRole = role => {
    return (req, res, next) => {
        if (req.user.role !== role) return res.status(403).json({ error: 'Invalid credentials' });
        next();
    }
}

module.exports = { checkToken, checkRole }