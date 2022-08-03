const { Router } = require('express');
const {    
    getOperations,
    createOperation
} = require('../controllers/operation');
const validateUsers = require('../middleware/validateUsers');

const operationRoutes = Router();


operationRoutes.get('/get', validateUsers, getOperations);
operationRoutes.post('/create', validateUsers, createOperation);


module.exports = operationRoutes;