const mongoose = require("mongoose");

// const dbUser = process.env.DB_USER;
// const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb://127.0.0.1:27017/colegioReal`
  )
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao servidor", error);
  });
