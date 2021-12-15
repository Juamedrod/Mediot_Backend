/**
 * MONGODB CONFIG FILE
 */
const mongoose = require('mongoose');
/**
 * Mongoose init connection with mongodb via string
 */
mongoose.connect(process.env.DB_URL);
