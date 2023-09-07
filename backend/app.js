const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");

const dataBase = require("./src/config/base");
const userRoutes = require("./src/routes/userRoutes");
const clientsRoutes = require("./src/routes/clientsRoutes");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.text({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());

// rota
app.use(userRoutes);
app.use("/user", userRoutes);
app.use("/clientes", clientsRoutes);

const server = http.createServer(app);

const port = 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
