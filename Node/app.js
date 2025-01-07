const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const admin = require("./routes/admin");

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Mongoose
// (Configure o mongoose aqui, se necessário)

// Rotas
app.use("/admin", admin);


const PORT = 8081;
app.listen(PORT, () => {
  console.log("Servidor rodando!");
});
