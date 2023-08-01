const User = require('../models/userModel')
const userRoutes = require('../routes/userRoutes')
const axios = require('axios')
const {response} = require('express')

exports.createUser = async (req,res) =>{
    console.log('chegou do create', req.body)
    const { nomeCompleto, telefone, username, password} = req.body
    try{
        const user = await User.create({
            nomeCompleto, 
            telefone, 
            username, 
            password
        })
        res.status(201).json({msg: "Usuário criado com sucesso", user})
    }

    catch(error){
        console.log("Deu esse erro ao criar", error)
        res.status(500).json({msg: "Deu esse erro", error})
    }
}

exports.getAllUser = async (req, res) => {
  console.log("Chegou do getAllUser");
  try {
    const users = await User.find();
    res.status(200).json({ msg: "todos os usuários", users }); 
  } catch (error) {
    console.log("Erro ao localizar usuário", error);
    res.status(500).json({ msg: "Erro ao localizar", error });
  }
};

exports.getOneUser = async (req,res) => {
    console.log("Chegou do get ID", req.body)
    const {id} = req.params 
    try{
        const user = await User.findById(id)
        console.log("Usuário encontrado", user)
        res.status(200).json({msg: "Usuário encontrado", user})
    }
    catch(error){
        console.log("Erro", error)
        res.status(500).json({msg: "Erro ao localizar um unico usuário", error})
    }
}


exports.updateUser = async (req,res) =>{
    const {id} = req.params
    const { nomeCompleto, telefone, username, password} = req.body
    try{
        const user = await User.findByIdAndUpdate(
            id,
            { nomeCompleto, telefone, username, password},
            {new: true}
        )
        res.status(200).json({msg: "Usuário atualizado com sucesso"})
    }
    catch(error){
        res.status(500).json({error: "Erro ao atualizar usuário", error})
    }
}

exports.deletUser = async (req,res) =>{
    const {id} = req.params
    try{
        const user = await User.findByIdAndDelete(id)
        res.status(200).json({msg: "Usuário deletado com sucesso"})
    }
    catch(error){
        res.status(500).json({error: "Erro ao deletar", error})
    }
}

exports.authenticateUser = async (req,res) =>{
    const{usuario, password} = req.body;
    try{
        const user = await User.findOne({usuario});
        if( !user || user.password !== password){
            return res.status(401).json({sucess: false, message: "Credenciais inválidas"})
        }
        return res.status(200).json({sucess: true, message: "Auntenticação bem sucedida"})
    }
    catch (error) {
        console.error("Erro ao autenticar o usuário:", error);
        return res.status(500).json({ success: false, message: "Erro ao autenticar o usuário" });
      }
}