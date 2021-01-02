//Criação de rotas de outro arquivo JS para mandar para a index
const express = require('express')
const Procedimento = require('../DataBases/Procedimentos')
const router = express.Router()
const slugify = require('slugify')
const Resposta = require('../DataBases/Resposta')

router.get("/admin/procedimentos/new",(req,res)=>{
    res.render("admin/procedimentos/new")
})

router.post('/procedimentos/save',(req,res)=>{
    var proc_titulo = req.body.proc_titulo
    var proc_descricao = req.body.proc_descricao
    var nivel = req.body.nivel
    if(proc_titulo != undefined){
    Procedimento.create({
        proc_titulo:proc_titulo,
        proc_descricao:proc_descricao,
        slug:slugify(proc_titulo),
        nivel:nivel
    }).then(()=>{
        res.redirect("/admin/procedimentos")
    })
}else{
    res.send('ERRO')
    res.redirect("/admin/procedimentos/new")
}
})

router.get("/admin/procedimentos",(req,res)=>{
    Procedimento.findAll().then(procedimentos =>{
        res.render("admin/procedimentos/index",{procedimentos:procedimentos})
    })
})

router.get("/admin/procedimentos/edit/:id",(req,res)=>{
    var id = req.params.id
    if(isNaN(id)){
        res.redirect("/admin/procedimentos")
    }
    Procedimento.findByPk(id).then(procedimento =>{
        if(procedimento!=undefined){
            res.render("admin/procedimentos/edit",{procedimento:procedimento})
        }else{
            res.redirect("/admin/procedimentos")
        }
    }).catch(err =>{
        res.redirect("/admin/procedimentos")
    })
    
})
router.post("/procedimento/update",(req,res)=>{
    var id = req.body.id
    var proc_titulo = req.body.proc_titulo
    var proc_descricao = req.body.proc_descricao
    var nivel = req.body.nivel
    Procedimento.update({proc_titulo:proc_titulo,proc_descricao:proc_descricao,nivel:nivel,slug:slugify(proc_titulo)},{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/admin/procedimentos")
    })
})

router.post("/procedimento/delete",(req,res)=>{
    var id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            Procedimento.destroy({
                where:{id:id}
            }).then(()=>{
                res.redirect("/admin/procedimentos")
            }).catch(err =>{
                res.redirect("/admin/procedimentos")
            })
        } else {
            res.redirect("/admin/procedimentos")
        }
    } else {
        res.redirect("/admin/procedimentos")
    }
})

module.exports = router