const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');


router.get('/clientes', clientsController.getAllClients)
router.post('/novoCliente', clientsController.createClient);


module.exports = router