const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

/**
 * Global Configs
 */
require('dotenv').config();
require('./dbConfig');

/**
* Routers imports
*/
const apiRouter = require('./routes/api');

/**
 * APP initialization
 */
const app = express();

/**
 * Express Config
 */
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

/**
 * Routing
 */
app.use('/api', apiRouter);

/**
 * APP listening
 */
const server = app.listen((process.env.PORT || 3000), () => {
    console.log('Server listening on port', server.address().port);
});