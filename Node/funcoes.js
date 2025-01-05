const express = require("express");
const app = express();
const { engine } = require('express-handlebars');
const Sequelize = require('sequelize');

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')

const sequelize = new Sequelize('SistemaDeCadastro', 'root', 'Omegamon37871145887', {
    host: "localhost",
    dialect: 'mysql'

})
app.get('/cad', function(req, res){
    res.send('Rota de Cadastro de Post')
})
app.listen(8081, function(){
    console.log("Servidor rodando na url localhost:8081");
});
