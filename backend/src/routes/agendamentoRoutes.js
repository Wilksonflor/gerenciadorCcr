const express = require('express')
const router = express.Router();
const agendamentoController = require('../controllers/agendamentosController')


router.get('/horarios', agendamentoController.getHorarios)
router.get('/horarios/cliente/:id', agendamentoController.getAgendamentoPorCliente)
router.post('/novoAgendamento', agendamentoController.criarHorario)
router.get('/verificarDisponibilidade', agendamentoController.verificarDisponibilidade)
router.get('/horarios/dataJogo/:date', agendamentoController.dataJogo);




module.exports = router;