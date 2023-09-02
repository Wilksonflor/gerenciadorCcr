const Clients = require('../models/clientsModel')

exports.createClient = async (req,res) =>{
    const {nomeCompleto, telefone, outro} = req.body
    console.log("cliente", req.body)
    try{
        const client = await Clients.create({
            nomeCompleto,
            telefone,
            outro,
        })
        res.status(201).json({msg: "Cliente criado com sucesso"})
    }
    catch(error){
        console.log("erro: ", error)
        res.status(500).json({msg: "error ao criar cliente: ", error})
    }
}
