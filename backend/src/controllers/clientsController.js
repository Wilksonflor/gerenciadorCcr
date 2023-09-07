const Clients = require('../models/clientsModel')

exports.createClient = async (req,res) =>{
    const {nomeCompleto, contato, observacoes} = req.body
    console.log('Cliente criado com sucesso!!:', req.body);
    try{
        const cliente = await Clients.create({
            nomeCompleto,
            contato,
            observacoes,
        })
        res.status(201).json({msg: "Cliente criado com sucesso", cliente})
    }
    catch(error){
        console.log("erro: ", error)
        res.status(500).json({msg: "error ao criar cliente: ", error})
    }
}

exports.getAllClients = async (req,res) =>{
    console.log("Chegou do getAll", req.body)
    try{
        const clients = await Clients.find();
        res.status(200).json({msg: "todos os clientes", clients})
    }
    catch(error){
        res.status(500).json({msg: "Error ao recuperar todos os clientes", error})
    }
}