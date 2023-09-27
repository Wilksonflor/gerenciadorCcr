const Clients = require("../models/clientsModel");

exports.createClient = async (req, res) => {
  const { nomeCompleto, contato, observacoes } = req.body;
  console.log("Cliente criado com sucesso!!:", req.body);
  try {
    const cliente = await Clients.create({
      nomeCompleto,
      contato,
      observacoes,
    });
    res.status(201).json({ msg: "Cliente criado com sucesso", cliente });
  } catch (error) {
    console.log("erro: ", error);
    res.status(500).json({ msg: "error ao criar cliente: ", error });
  }
};

exports.getAllClients = async (req, res) => {
  console.log("Chegou do getAll dos clientes", req.body);
  try {
    const clients = await Clients.find();
    res.status(200).json({ msg: "todos os clientes", clients });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error ao recuperar todos os clientes", error });
  }
};

exports.getOneClient = async (req, res) => {
  console.log("Chegou do getOne", req.body);
  const { id } = req.params;
  try {
    const client = await Clients.findOne({ _id: id });
    if (!cliente) {
      return res.status(404).json({ msg: "Cliente não encontrado" });
    }
    res.status(200).json({ msg: "Cliente: ", client });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao resgatar do getOne", error });
  }
};

exports.updateClient = async (req, res) => {
  console.log("Editei o cliente", req.body);
  const { id } = req.params;
  const { nomeCompleto, contato, observacoes } = req.body;
  try {
    const client = await Clients.findByIdAndUpdate(
      id,
      { nomeCompleto, contato, observacoes },
      { new: true }
    );
    if (!client) {
      return res.status(404).json({ msg: "Cliente não encontrado!" });
    }
    res.status(200).json({ msg: "Cliente atualizado!", client });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar cliente", error });
  }
};

exports.deleteOneCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Clients.findByIdAndDelete(id);
    if (!client) {
      res.status(404).json({ msg: "Cliente não encontrado" });
      return;
    }
    res.status(200).json({ msg: "Cliente excluido com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao  excluir um cliente", error });
  }
};

exports.relatorioClient = async (req, res) => {
  console.log("Chegou do relatório do cliente", req.body);
  const { id } = req.params;
  try {
    const client = await Clients.findOne({ _id: id }).populate({
        path: "horario", 
        select: "date horaInicio horaTermino"
    });
    console.lopg('cliente', client)
    if (!client) {
      return res.status(404).json({ msg: "Cliente não encontrado" });
    }
    console.log('cliente', client)

    const agendamentos = await Horario.find({ client: id });

    const clienteComAgendamento = {
      client,
      agendamentos,
    };

    res.status(200).json({ msg: "Cliente", clienteComAgendamento });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao resgatar do getOne", error });
  }
};
