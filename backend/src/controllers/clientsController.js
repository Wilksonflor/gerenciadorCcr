const Clients = require('../models/clientsModel')

exports.createClient = async (req,res) =>{
    const {nomeCompleto, contato, observacoes} = req.body
    console.log("cliente", req.body)
    try{
        const client = await Clients.create({
            nomeCompleto,
            contato,
            observacoes,
        })
        res.status(201).json({msg: "Cliente criado com sucesso", client})
    }
    catch(error){
        console.log("erro: ", error)
        res.status(500).json({msg: "error ao criar cliente: ", error})
    }
}
