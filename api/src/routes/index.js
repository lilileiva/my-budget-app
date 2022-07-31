const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    prueba
} = require('../controllers');

const router = Router();


router.get('/', prueba);


module.exports = router;
