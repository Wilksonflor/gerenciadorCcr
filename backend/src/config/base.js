const mongoose = require("mongoose");

// const dbUser = process.env.DB_USER;
// const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://wilksonflor12:wilkson88118577@cluster0.m33sao3.mongodb.net/colegioReal`
  )
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao servidor", error);
  });
