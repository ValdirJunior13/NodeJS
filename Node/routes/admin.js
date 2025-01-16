const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categoria");
const Categoria = mongoose.model("categorias");
require("../models/Postagem")
const Postagem = mongoose.model('postagens')

// Rota principal
router.get("/", (req, res) => {
    Postagem.find().sort({data: 'desc'}).then((postagens) => {
        res.render('admin/index', {postagens: postagens})

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno")
        res.redirect("/404")
    })
});


// Rota de posts
router.get("/posts", (req, res) => {
    res.send("Página de posts");
});

// Página de listagem de categorias
router.get("/categorias", (req, res) => {
    Categoria.find().sort({date:'desc'}).lean().then((categorias) => {
        res.render("admin/categorias", {categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as categorias");
        res.redirect('/admin');
    })
});

// Página de formulário para adicionar categorias
router.get("/categorias/add", (req, res) => {
    res.render("admin/addcategorias");
});

// Rota para salvar uma nova categoria
router.post("/categorias/nova", (req, res) => {
    let erros = [];

    // Validação dos campos
    if (!req.body.nome || typeof req.body.nome === "undefined" || req.body.nome === null) {
        erros.push({ texto: "Nome inválido" });
    }

    if (!req.body.slug || typeof req.body.slug === "undefined" || req.body.slug === null) {
        erros.push({ texto: "Slug inválido" });
    }

    if (req.body.nome && req.body.nome.length < 2) {
        erros.push({ texto: "Nome da categoria muito pequeno" });
    }

    // Se houver erros, renderiza a página novamente com os erros
    if (erros.length > 0) {
        res.render("admin/addcategorias", { erros: erros });
    } else {
        // Caso contrário, cria uma nova categoria
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug,
        };

        new Categoria(novaCategoria)
            .save()
            .then(() => {
                req.flash("success_msg", "Categoria criada com sucesso!");
                res.redirect("/admin/categorias");
            })
            .catch((err) => {
                req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente.");
                res.redirect("/admin");
            });
    }
});

// Rota de teste
router.post("/teste", (req, res) => {
    res.send("Isso é um teste");
});

//lembrar de usar o .lean() pra resolver o erro do mongoose
router.get("/categorias/edit/:id", (req, res) => {
    Categoria.findOne({_id: req.params.id}).lean().then((categoria) => {
        res.render("admin/editcategorias", {categoria: categoria});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar a categoria, tente novamente.");
        res.redirect("/admin/categorias");
    });
});

router.post("/categorias/edit", (req,res)=>
{
    Categoria.findOne({_id: req.body.id}).then((categoria) => {
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(() => {
            req.flash("success_msg", "Categoria editado com sucesso!")
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao salvar a edicao da categoria")
            res.redirect("/admin/categorias")
        })

    })
})
router.post("/categorias/deletar", (req,res)=>{
    Categoria.deleteOne({_id: req.body.id}).lean().then(()=>{
        req.flash("success_msg", "categoria deletada com sucesso")
        res.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno ao salvar a edicao da categoria")
        res.redirect("/admin/categorias")
    
})
})
router.get("/postagens", (req, res) =>{
    Postagem.find().populate("categoria").sort({data:"descending"}).then((postagens) => {
        res.render("admin/postagens", {postagens:postagens})
    }).catch((err) => {
        req.flash("error_msg", "houve um erro ao listar as postagens" )
        res.redirect("/admin")
    })
  
})
router.get('/postagens/add', (req, res) =>{
    Categoria.find().lean().then((categorias) => {
        res.render("admin/addpostagem", {categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno ao carregar o formulário")
        res.redirect("/admin")
    })
})
router.post('/postagens/nova', (req, res) =>{
    var erros=[]
    if(!req.body.categoria || req.body.categoria === '0'){
        erros.push({texto: "Categoria inválida, registre uma categoria"})

}
    if(erros.length > 0){
        res.render('admin/addpostagem', {erros: erros})
    }
    else{
        const novaPostagem ={
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug
        }
        new Postagem(novaPostagem).save().then(() => {
            req.flash("success_msg", "Postagem criada com sucesso")
            res.redirect("/admin/postagens")
        }).catch(() => {
            req.flash("error_msg", "Houve um erro durante o salvamento da postagem")
            res.redirect("/admin/postagens")
        })
    }
})
module.exports = router;
