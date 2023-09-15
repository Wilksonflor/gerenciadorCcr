const express = require('express')
const router = express.Router();
const agendamentoController = require('../controllers/agendamentosController')


// router.get('/agendamento')
router.post('/novoHorario', agendamentoController.criarHorario)