const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const admin = require("./routes/admin");
const path = require('path')
// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Mongoose
mongoose.connect('mongodb://localhost/app').then(() =>{
console.log("conectado ao mongo")
}).catch((err) => {
  console.log("Erro ao se conectar" + err)
})
// Public
app.use(express.static(path.join(__dirname, "public")));



// Rotas
app.use("/admin", admin);


const PORT = 8081;
app.listen(PORT, () => {
  console.log("Servidor rodando!");
});
