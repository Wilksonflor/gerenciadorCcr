const express = require('express');
const clientsController = require('../controllers/clientsController');
const router = express.Router();



router.post('/clientes', clientsController.createClient);

module.exports = router