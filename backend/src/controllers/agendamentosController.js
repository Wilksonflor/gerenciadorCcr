const Horario = require('../models/agendamentoModel');
const Clients = require('../models/clientsModel')
exports.criarHorario = async (req, res) => {
    const { date, horaInicio, horaTermino, clientId } = req.body; 
    console.log("Horário agendado com sucesso", req.body)
    try {
        // getClientById - pegar o obje
        const client = await Clients.findById(clientId)
        const novoHorario = await Horario.create({
            nomeCompleto: client.nomeCompleto,
            date,
            horaInicio,
            horaTermino,
            client
        });

        res.status(200).json({ msg: "Horário agendado com sucesso", novoHorario });
    } catch (error) {
        console.error('Erro ao criar', error); 
        res.status(500).json({ msg: "Erro ao criar horário", error });
    }
};


exports.getHorarios = async (req, res) => {
  try {
    const horarios = await Horario.find().populate('client');
    res.status(200).json(horarios);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao recuperar os horários" });
  }
};
