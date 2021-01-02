//Estou dizendo para ele criar uma variavel que requisita o expres e declaro uma variavel app que chama a função do express
const express = require('express')
const app = express()
//Estou configurando o bodyParser que é o que tras os dadso inseridos no formulario
const bodyParser = require("body-parser")
//Exportando conexão
const connection = require('./DataBases/databases')
//exportando model de ciração de tabelos no banco
const Forum = require("./DataBases/Forum")
const Resposta = require("./DataBases/Resposta")
const Procedimento = require("./DataBases/Procedimentos")
const procedimentos = require("./admin/procedimentos")
const Classificacao = require("./DataBases/Classificacao")
const Operacao = require("./DataBases/Operacao")
const Comunicados = require('./DataBases/Comunicados')
const comunicados = require('./admin/comunicados')

//databases
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })
//databases
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })
//usar o EJS como view engine | renderizador de html
app.set('view engine', 'ejs')
//Carregamento de arquivos estaticos no express
app.use(express.static('public'))
//Carregamento do bodyPerser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/',comunicados)
app.use("/",procedimentos)
app.get("/admin",(req,res)=>{
    res.render("admin/admin/ad.ejs")
})
//Rotas
app.get("/", (req, res) => {
    Comunicados.findAll({
        where:{importancia:'alta'}
    }).then(comunicados =>{
        res.render("index",{comunicados:comunicados});
    })
    //Informa variavéis que irão ser apresentadas no inde   
    
})

app.get("/comunicados",(req,res)=>{
    Comunicados.findAll().then(comunicados =>{
        res.render('comunicados.ejs',{comunicados:comunicados})
    })
    

app.get("/comunicados", (req, res) => {
    res.render('comunicados.ejs')

})

app.get("/guiadoiniciante", (req, res) => {
    res.render('guiadoiniciante.ejs')
})

//Rota do BANCO forum
app.get("/forum", (req, res) => {
    res.render("forum")
})

app.post("/save", (req, res) => {
    titulo = req.body.titulo
    idOp = 0
    descricao = req.body.descricao //Inserir dados a tabela -> insert into pergunta titulo, descrição (xxx,xxx)
    Forum.create({
        titulo: titulo,
        descricao: descricao,
        idOp: idOp
        //Apos receber os dadso usuario sera redirecionado a pagina inicial
    }).then(() => {
        res.redirect("/forum_aberto");
    });
})

//Rotas banco Resposta

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo
    var perguntaId = req.body.resposta
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/forum_aberto/" + perguntaId)
    })
})

app.get("/forum_aberto", (req, res) => {
    Forum.findAll({
        raw: true, order: [
            ['id', 'DESC']
        ]
    }).then(forum_aberto => {
        res.render('forum_aberto', {
            forum_aberto: forum_aberto
        })
    })
})

app.get("/forum_aberto/:id", (req, res) => {
    var id = req.params.id
    Forum.findOne({
        where: { id: id }
    }).then(forum_aberto => {
        Resposta.findAll({
            where: { perguntaId: forum_aberto.id },
            order: [
                ['Id', 'DESC']
            ]
        }).then(resposta => {
            res.render("resposta", {
                forum_aberto: forum_aberto,
                resposta: resposta
            })
        })
    })
})
//atualizações
app.get('/atualizacoes', (req, res) => {
    res.render('atualizacoes')
})
//Classificacao
app.post('/save_classi', (req, res) => {
    classi = req.body.fb
    id_op = req.body.id_op
    Classificacao.create({
        classi: classi,
        id_op: id_op
    })
})

// app.get('/procedimentos', (req, res) => {
//     var id = procedimento.id
//     Classificacao.findOne({
//         raw: true, order: [
//             ['id', 'DESC']
//         ]
//     }).then(proce => {
//         Classificacao.findAll({
//             where: { id_op: proce.id }
//         }).then(classifi => {
//             if (classifi != undefined) {
//                 res.render("procedimentos", {
//                     classifi: classifi,
//                     proce: proce
//                 })
//             } else {
//                 res.redirect('/')
//             }
//         })
//     })
// })


app.post('/save_op', (req, res) => {
    titulo = req.body.titulo
    idOp = req.body.resposta
    descricao = req.body.descricao

    Forum.create({
        titulo: titulo,
        descricao: descricao,
        idOp: idOp
    }).then(() => {
        res.redirect("/forum_aberto")
    })
})


app.get("/forum_operacao/:id", (req, res) => {
    var id = req.params.id
    Procedimento.findOne({
        where: { id: id }
    }).then(procedimento => {
        res.render("forum_operacao", {
            procedimento: procedimento
        })
    })
})

app.get("/procedimentos",(req,res)=>{
    Procedimento.findAll({
        raw:true,order:[
            ['id','DESC']
        ]
    }).then(procedimentos => {
        res.render("procedimentos",{
            procedimentos:procedimentos,
        })
        })
    })


app.get("/operacao/:id", (req, res) => {
    var id = req.params.id

    Procedimento.findOne({
        where: { id: id }
    }).then(procedimentos => {
        if (procedimentos != undefined) {
            res.render("operacao", {
                procedimentos: procedimentos
            })
        } else {
            res.redirect('/forum')
        }
    })
})
})


app.listen(8080, () => {
    console.log("Servidor rodando!")
})