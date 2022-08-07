const { Router } = require('express');
const {    
    getCategories,
} = require('../controllers/category');

const categoryRoutes = Router();


categoryRoutes.get('/get', getCategories);


module.exports = categoryRoutes;