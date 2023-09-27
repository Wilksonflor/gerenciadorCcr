
const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');



router.get('/clientes', clientsController.getAllClients);
router.post('/novoCliente', clientsController.createClient);
router.get('/clientes/:id', clientsController.getOneClient);
router.get('/clientes/relatorio/:id', clientsController.relatorioClient);
router.put('/clientes/:id', clientsController.updateClient);
router.delete('/clientes/:id', clientsController.deleteOneCliente);

module.exports = router;
