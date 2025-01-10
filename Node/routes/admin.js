const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Categoria');
const Categoria = mongoose.model("categorias");

// Rota principal do admin
router.get('/', (req, res) => {
    res.render("admin/index");
});

// Rota de posts
router.get('/posts', (req, res) => {
    res.send("Página de posts");
});

// Rota de categorias
router.get('/categorias', (req, res) => {
    res.render("admin/categorias");
});

// Rota para adicionar categorias
router.get('/categorias/add', (req, res) => {
    res.render("admin/addcategorias");
});

// Rota para salvar uma nova categoria
router.post("/categorias/nova", (req, res) => {
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    };

    // Salvar no banco de dados
    new Categoria(novaCategoria).save()
        .then(() => {
            console.log("Categoria salva com sucesso!");
            res.redirect('/categorias'); // Redireciona para a página de categorias
        })
        .catch((err) => {
            console.log("Erro ao salvar categoria: " + err);
            res.redirect('/categorias/add'); // Redireciona para a página de adição
        });
});

// Rota de teste
router.post("/teste", (req, res) => {
    res.send("Isso é um teste");
});

module.exports = router;
