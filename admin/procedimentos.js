//Criação de rotas de outro arquivo JS para mandar para a index
const express = require('express')
const Procedimento = require('../DataBases/Procedimentos')
const router = express.Router()
const slugify = require('slugify')

router.get("/admin/procedimentos/new",(req,res)=>{
    res.render("admin/procedimentos/new")
})

router.post('procedimentos/save',(req,res)=>{
    var proc_titulo = req.body.proc_titulo
    var proc_descricao = req.body.proc_descricao
    var nivel = req.body.nivel
    Procedimento.create({
        proc_titulo:proc_titulo,
        proc_descricao:proc_descricao,
        slug:slugify(proc_titulo),
        nivel:nivel
    })
})

router.get("/admin/procedimentos",(req,res)=>{
    Procedimento.findAll().then(procedimentos =>{
        res.render("admin/procedimentos/index",{procedimentos:procedimentos})
    })
})

module.exports = router