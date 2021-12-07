const jwt = require('jsonwebtoken');
const fs = require('fs');

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

const writeLog = (id, key, value) => {
    const loggy = { action: key, value, Date: new Date() };
    const logFile = fs.createWriteStream(`./public/logs/${id}.txt`, { flags: 'a' });
    logFile.write(JSON.stringify(loggy) + ',');
    logFile.end();
}

const readLog = (id) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`./public/logs/${id}.txt`, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}



module.exports = { createToken, writeLog, readLog };