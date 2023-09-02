const User = require("../models/userModel");
const bcrypt = require("bcrypt");



exports.registerUser = async (req, res) => {
  const { nomeCompleto, telefone, username, password, confirmpassword } = req.body;
  console.log("teste", req.body)

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);
  try {
    const user = await User.create({
      nomeCompleto,
      telefone,
      username,
      password: passwordHash,
    });
    res.status(201).json({ msg: "Usuário criado com sucesso", user });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ msg: "Erro ao criar usuário", error });
  }
};


exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ msg: "Todos os usuários", users });
  } catch (error) {
    console.error("Erro ao localizar usuários:", error);
    res.status(500).json({ msg: "Erro ao localizar usuários", error });
  }
};

exports.getOneUser = async (req, res) => {
  const { nome } = req.params;
  try {
    const user = await User.findOne({
      nomeCompleto: { $regex: nome, $options: "i" },
    });
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }
    res.status(200).json({ msg: "Usuário encontrado", user });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ msg: "Erro ao localizar o usuário", error });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { nomeCompleto, telefone, username, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { nomeCompleto, telefone, username, password },
      { new: true }
    );
    res.status(200).json({ msg: "Usuário atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ msg: "Erro ao atualizar usuário", error });
  }
};

exports.deletUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ msg: "Erro ao deletar usuário", error });
  }
};

exports.authenticateUser = async (req, res) => {
  const { usuario, password } = req.body;
  if (!usuario || !password) {
    return res.status(422).json({ msg: "Usuário e senha obrigatórios" });
  }
  try {
    const user = await User.findOne({ usuario });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Credenciais inválidas" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Autenticação bem sucedida" });
  } catch (error) {
    console.error("Erro ao autenticar o usuário:", error);
    res.status(500).json({ success: false, message: "Erro ao autenticar o usuário" });
  }
};

