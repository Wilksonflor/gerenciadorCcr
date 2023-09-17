const Horario = require('../models/agendamentoModel');
const Clients = require('../models/clientsModel')



exports.criarHorario = async (req, res) => {
    const { date, horaInicio, horaTermino, clientId } = req.body; 
    console.log("Horário agendado com sucesso", req.body)
    try {
       
        const client = await Clients.findById(clientId)
        const novoHorario = await Horario.create({
            nomeCompleto: client.nomeCompleto,
            date,
            horaInicio,
            horaTermino,
            clientId
        });

        res.status(200).json({ msg: "Horário agendado com sucesso", novoHorario });
    } catch (error) {
        console.error('Erro ao criar', error); 
        res.status(500).json({ msg: "Erro ao criar horário", error });
    }
};


exports.getHorarios = async (req, res) => {
  console.log("Chegou do get do horario", req.body)
  try {
    const horarios = await Horario.find().populate({
      path: 'client',
      select: 'nomeCompleto contato', 
    });

    res.status(200).json(horarios);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao recuperar os horários", error});
  }
};
