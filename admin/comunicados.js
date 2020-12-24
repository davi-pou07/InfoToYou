//Criação de rotas de outro arquivo JS para mandar para a index
const express = require('express')
const Classificacao = require('../DataBases/Classificacao')
const Comunicados = require('../DataBases/Comunicados')
const router = express.Router()


//carregando slugify
// const slugify = require('slugify')
//Inserir um novo comunicado
router.get('/admin/comunicados/new',(req,res)=>{
    res.render("admin/comunicados/new")
})

//Vizualizar comunicado
router.post('/comunicados/save',(req,res)=>{
    var titulo = req.body.titulo
    var comunicados = req.body.body
    var status = req.body.status
    if(titulo != undefined){
        Comunicados.create({
            titulo:titulo,
            comunicado:comunicados,
            status:status
        }).then(()=>{
            res.redirect("/admin/comunicados")
        })
    }else{
        res.send('ERRO')
        res.redirect("/admin/comunicados/new")
    }
})

router.get('/admin/comunicados',(req,res)=>{
    Comunicados.findAll().then(comunicados =>{
        res.render('admin/comunicados/index',{
            comunicados: comunicados
        })
    })
})

// Editar comunicado
router.get("/admin/comunicados/edit/:id",(req,res)=>{
    var id = req.params.id

    if(isNaN(id)){
        res.redirect("/admin/comunicados")
    }
    
    Comunicados.findByPk(id).then(comunicados =>{
        if(comunicados != undefined){

        res.render('admin/comunicados/edit',{comunicados:comunicados})
            
        }else{
            res.redirect("/admin/comunicados")
        }
    }).catch(erro =>{
        res.redirect("/admin/comunicados")
    })
})

router.post("/comunicados/update",(req,res)=>{
    var id =  req.body.id
    var titulo = req.body.titulo
    var comunicado = req.body.body
    var status = req.body.status
    Comunicados.update ({titulo:titulo, comunicado:comunicado, status:status},{ 
        where: {
            id:id
        }
    }).then(()=>{
        res.redirect("/admin/comunicados")
    })
})
router.post("/comunicados/delete", (req,res)=>{
    var id = req.body.id;
    if (id!= undefined) {
       if (!isNaN(id)) {

        //Deletar categoria
        Comunicados.destroy({
            where:{id:id}
        }).then(()=>{
            res.redirect("/admin/comunicados")
        })   

       } else {
           res.redirect("/admin/comunicados")
       }
    } else {
        res.redirect("/admin/comunicados")
    }
})





module.exports = router