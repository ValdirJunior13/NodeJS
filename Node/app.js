const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const admin = require("./routes/admin");
const path = require('path')
const session = require("express-session")
const flash = require("connect-flash")
require("./models/Postagem")
const Postagem = mongoose.model('postagens')
app.set("views", path.join(__dirname, "views"));
//Sessão
app.use(session({
  secret: "12345678",
  resave: true,
  saveUninitialized:true
}))

app.use(flash())
//middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
  
})
app.get('/404', (req, res) =>{
  res.send("erro 404")
})
// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}))

// Handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/app').then(() =>{
console.log("conectado ao mongo")
}).catch((err) => {
  console.log("Erro ao se conectar" + err)
})
// Public
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  next();

})


// Rotas
app.use("/admin", admin);
app.use("/", (req, res) => {
  Postagem.find().lean().populate("categoria").sort({data: "desc"}).then((postagens) => {
    res.render("index", {postagens:  postagens})
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro na tela inicial");
    res.redirect('/404')
  })

})
app.get("/postagens/:slug", (req, res) => {
  Postagem.findOne({slug: req.params.slug}).then((postagem) => {
    if(postagem){
      res.render("postagens/index", {postagem: postagem})

    }else{
      req.flash("error_msg", "Esta mensagem não existe")
      res.redirect("/")
       
    }
  }).catch((err)=>{
    req.flash("error_msg", "Esta postagem não existe")
    res.redirect("/")
  })
})
const PORT = 8081;
app.listen(PORT, () => {
  console.log("Servidor rodando!");
});
