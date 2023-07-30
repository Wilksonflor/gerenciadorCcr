const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");
const dataBase = require('./src/config/base')



// middleware
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.text({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());

// app.use("/alarm", alarmRoutes); colocar a rota para cada um

const server = http.createServer(app);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
