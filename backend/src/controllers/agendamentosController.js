const Horario = require('../models/timerModel.js');

exports.criarHorario = async (req, res) => {
    const { date, horaInicio, horaTermino, clientId } = req.body; 
    try {
        const novoHorario = await Horario.create({
            date,
            horaInicio,
            horaTermino,
            client: clientId 
        });

        res.status(200).json({ msg: "Horário agendado com sucesso", novoHorario });
    } catch (error) {
        console.error('Erro ao criar', error); 
        res.status(500).json({ msg: "Erro ao criar horário", error });
    }
};
