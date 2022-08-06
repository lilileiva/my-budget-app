const { Router } = require('express');
const transactionRoutes = require('./transaction');
const userRoutes = require('./user');
const categoryRoutes = require('./category');

const routes = Router();


routes.use('/transaction', transactionRoutes);
routes.use('/users', userRoutes);
routes.use('/categories', categoryRoutes);


module.exports = routes;
