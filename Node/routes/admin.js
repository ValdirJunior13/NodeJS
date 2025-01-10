const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categoria");
const Categoria = mongoose.model("categorias");

// Rota principal
router.get("/", (req, res) => {
    res.render("admin/index");
});

// Rota de posts
router.get("/posts", (req, res) => {
    res.send("Página de posts");
});

// Página de listagem de categorias
router.get("/categorias", (req, res) => {
    res.render("admin/categorias");
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

module.exports = router;
