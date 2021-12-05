const jwt = require('jsonwebtoken');

/**
 * Crea el token de authentificacion.
 * @param {object} user user
 * @param {string} expireTime expire time in jwt format
 * @returns Token firmado
 */

const createToken = (user, expireTime) => {
    const obj = {
        id: user.id,
        name: user.name
    }
    return jwt.sign(obj, process.env.SECRET_KEY, { expiresIn: expireTime });
};

module.exports = { createToken };