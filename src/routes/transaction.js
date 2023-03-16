const { Router } = require('express');
const {    
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transaction');
const validateUsers = require('../middleware/validateUsers');


const transactionRoutes = Router();

transactionRoutes.get('/get', validateUsers, getTransactions);
transactionRoutes.post('/create', validateUsers, createTransaction);
transactionRoutes.put('/update/:id', validateUsers, updateTransaction);
transactionRoutes.delete('/delete/:id', validateUsers, deleteTransaction);


module.exports = transactionRoutes;