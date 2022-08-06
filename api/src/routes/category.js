const { Router } = require('express');
const {    
    getCategories,
} = require('../controllers/category');
const validateUsers = require('../middleware/validateUsers');

const categoryRoutes = Router();


categoryRoutes.get('/get', validateUsers, getCategories);


module.exports = categoryRoutes;