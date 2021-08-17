'use strict';

require('dotenv').config();

const server = require('./src/server.js');

const data = require('./src/models/index.js');

const PORT = process.env.PORT || 3000;

// we need the sync step to create those tables that don't exist for sequelize and SQL
// this can run a promise
data.dataBase.sync().then(() => {
  server.start(PORT);
});
