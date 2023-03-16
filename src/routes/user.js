const { Router } = require('express');
const {    
    login,
    register
} = require('../controllers/user');

const userRoutes = Router();


userRoutes.post('/login', login);
userRoutes.post('/register', register);


module.exports = userRoutes;