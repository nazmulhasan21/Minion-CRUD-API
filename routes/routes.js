const api = require('express').Router();

const minionsRoutes = require('./minionsRoutes');

api.use('/minion', minionsRoutes);

module.exports = api;
