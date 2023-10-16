const Horario = require("../models/agendamentoModel");
const Clients = require("../models/clientsModel");

exports.criarHorario = async (req, res) => {
  const { date, horaInicio, horaTermino, clientId, valor } = req.body;
  console.log("Horário agendado com sucesso", req.body);
  try {
    // const client = await Clients.findById(clientId);
    const client = await Clients.findOne({ nomeCompleto: clientId });

    if (!client) {
      return res.status(400).json({ msg: "Cliente não encontrado" });
    }
    const horarioExistente = await Horario.findOne({
      date,
      horaInicio,
      horaTermino,
    });
    if (horarioExistente) {
      return res.status(400).json({
        message: "O horário não está disponível, por favor escolha outro horário",
      });
    }

    // Se horário estiver livre, cria o outro horário
    const novoHorario = await Horario.create({
      nomeCompleto: client.nomeCompleto,
      date,
      horaInicio,
      horaTermino,
      valor,
      client: client._id,
    });

    res.status(200).json({ msg: "Horário agendado com sucesso", novoHorario });
  } catch (error) {
    console.error("Erro ao criar", error);
    res.status(500).json({ msg: "Erro ao criar horário", error });
  }
};

exports.getHorarios = async (req, res) => {
  // console.log("Chegou do get", req.body)
  try {
    const horarios = await Horario.find().populate(
      "client",
      "nomeCompleto contato"
    );
    console.log("Horários com dados do cliente populados:", horarios);
    res.status(200).json(horarios);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao recuperar os horários", error });
  }
};

exports.getAgendamentoPorCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const agendamentos = await Horario.Find().populate(
      "client",
      "nomeCompleto contato horaInicio horaTermino valor"
    );
    res.status(200).json(agendamentos);
  } catch (error) {
    console.log("erro ao obter agendamento do cliente", error);
    res
      .status(500)
      .json({ msg: "Erro ao recuperar do relatorio por cliente", error });
  }
};
