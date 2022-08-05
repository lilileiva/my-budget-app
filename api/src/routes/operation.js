const { Router } = require('express');
const {    
    getOperations,
    createOperation,
    updateOperation
} = require('../controllers/operation');
const validateUsers = require('../middleware/validateUsers');

const operationRoutes = Router();


operationRoutes.get('/get', validateUsers, getOperations);
operationRoutes.post('/create', validateUsers, createOperation);
operationRoutes.put('/update/:id', validateUsers, updateOperation);


module.exports = operationRoutes;