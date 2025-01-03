const express = require("express");
const app = express();

app.get("/", function(req, res){
    res.sendFile(__dirname + "/Html/base.html");
})
app.get("/", function(req, res){
    res.send("Seja bem-vindo ao meu app");
});
app.get("/sobre", function(req, res){
    res.sendFile(__dirname + "/Html/sobre.html")
})

app.get("/sobre", function(req, res){
    res.send("Minha página sobre");
});

app.get("/blog", function(req, res){
    res.send("Bem-vindo ao meu blog!");
});

app.get('/ola/:cargo/:nome/:cor', function(req, res){
    res.send(req.params);
});

app.listen(8081, function(){
    console.log("servidor rodando");
});
