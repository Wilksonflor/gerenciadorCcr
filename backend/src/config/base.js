const moongose = require('mongoose')

moongose.connect('mongodb://127.0.0.1:27017/colegioReal')
.then(() =>{
    console.log("Conectado ao mongoDB")
})
.catch((error) =>{
    console.log("Erro ao conectar ao servidor", error)
})

