const { Router } = require('express');
const {    
    getCategories,
    deleteCategory
} = require('../controllers/category');
const validateUsers = require('../middleware/validateUsers');


const categoryRoutes = Router();

categoryRoutes.get('/get', validateUsers, getCategories);
categoryRoutes.delete('/delete/:id', validateUsers, deleteCategory);


module.exports = categoryRoutes;