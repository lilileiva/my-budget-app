const { Router } = require('express');
const transactionRoutes = require('./transaction');
const userRoutes = require('./user');

const routes = Router();


routes.use('/transaction', transactionRoutes);
routes.use('/users', userRoutes);


module.exports = routes;
