const User = require("../models/userModel");
// const bcrypt = require("bcrypt");



exports.registerUser = async (req, res) => {
  const { nomeCompleto, telefone, username, password} = req.body;
  console.log('cliente criado com sucesso', req.body)
  try {
  
    // if (password !== confirmPassword) {
    //   return res.status(400).json({ msg: "As senhas não coincidem" });
    // }

    // Hash da senha
    // const salt = await bcrypt.genSalt(10);
    // const passwordHash = await bcrypt.hash(password, salt);

    // Crie o usuário
    const user = await User.create({
      nomeCompleto,
      telefone,
      username,
      password,
      // password: passwordHash,
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
  const { username, password } = req.body;
  console.log('chegou do req', req.body)
  // Verifique se o nome de usuário e a senha são fornecidos
  if (!username || !password) {
    return res.status(422).json({ msg: "Usuário e senha obrigatórios" });
  }
  
  try {
    // Encontre o usuário no banco de dados
    const user = await User.findOne({ username });
    
    if (!user) {
      // Se o usuário não existe, retorne credenciais inválidas
      return res.status(401).json({ success: false, message: "Credenciais inválidas" });
    }
    
    // Verifique a senha usando bcrypt.compare
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (isPasswordValid) {
      // Se a senha está correta, retorne autenticação bem-sucedida
      return res.status(200).json({ success: true, message: "Autenticação bem sucedida" });
    } else {
      // Se a senha está incorreta, retorne credenciais inválidas
      return res.status(401).json({ success: false, message: "Credenciais inválidas" });
    }
  } catch (error) {
    console.error("Erro ao autenticar o usuário:", error);
    res.status(500).json({ success: false, message: "Erro ao autenticar o usuário" });
  }
};


