const express = require('express')
const router = express.Router();
const agendamentoController = require('../controllers/agendamentosController')


router.get('/horarios', agendamentoController.getHorarios)
router.post('/novoAgendamento', agendamentoController.criarHorario)



module.exports = router;