const jwt = require('jsonwebtoken');
const fs = require('fs');
const { parseAsync } = require('json2csv');

/**
 * create a csv file with the data info.
 * @param {JSON} data data to make CSV
 * @param {Array} fields array of strings with the fields to be included in the CSV 
 * @returns Promise with the CSV
 */
const createCSV = (data, fields) => {
    return parseAsync(data, { fields });
};

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

/**
 * Write a new Log entry into the user own log.txt namin the file with
 * id.txt extension.
 * @param {string} id UserId
 * @param {string} key action the user did to trigger a log save.
 * @param {string} value value of the action
 */
const writeLog = (id, key, value) => {
    const loggy = { action: key, value, Date: new Date() };
    const logFile = fs.createWriteStream(`./public/logs/${id}.txt`, { flags: 'a' });
    logFile.write(JSON.stringify(loggy) + ',');
    logFile.end();
}

/**
 * Read the logging info from the txt file.
 * @param {string} id userId
 * @returns Promise with the log info 
 */
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

module.exports = { createToken, writeLog, readLog, createCSV };