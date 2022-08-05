const { Router } = require('express');
const {    
    getTransactions,
    createTransaction,
    updateTransaction
} = require('../controllers/transaction');
const validateUsers = require('../middleware/validateUsers');

const transactionRoutes = Router();


transactionRoutes.get('/get', validateUsers, getTransactions);
transactionRoutes.post('/create', validateUsers, createTransaction);
transactionRoutes.put('/update/:id', validateUsers, updateTransaction);


module.exports = transactionRoutes;