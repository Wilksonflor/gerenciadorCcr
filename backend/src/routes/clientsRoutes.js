const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');



router.post('/clientes', clientsController.createClient);

module.exports = router