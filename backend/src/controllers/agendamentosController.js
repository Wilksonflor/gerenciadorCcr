const Horario = require('../models/agendamentoModel');

exports.criarHorario = async (req, res) => {
    const { date, horaInicio, horaTermino, clientId } = req.body; 
    console.log("Horário agendado com sucesso", req.body)
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

exports.getHorarios = async(req, res) =>{
    try{
        const horario = await Horario.find({
            date,
            horaInicio,
            horaTermino,
            client: clientId
        })
    }
    catch(error){
        res.status(500).json({msg: "Erro ao recuperar os horários"})
    }
}