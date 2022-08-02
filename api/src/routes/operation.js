const { Router } = require('express');
const {    
    getOperations,
    createOperation
} = require('../controllers/operation');

const operationRoutes = Router();


operationRoutes.get('/get', getOperations);
operationRoutes.post('/create', createOperation);


module.exports = operationRoutes;