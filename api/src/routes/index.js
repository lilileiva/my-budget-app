const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    prueba,
    getOperations,
    createOperation
} = require('../controllers');

const router = Router();


router.get('/', prueba);
router.get('/operations', getOperations);
router.post('/operation', createOperation);


module.exports = router;
