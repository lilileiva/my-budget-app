const { Router } = require('express');
const operationRoutes = require('./operation');
const userRoutes = require('./user');

const routes = Router();


routes.use('/operations', operationRoutes);
routes.use('/users', userRoutes);


module.exports = routes;
