const express = require("express");
const app = express();
const winston = require('winston');

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => winston.info(`Listening on port ${PORT}...`));