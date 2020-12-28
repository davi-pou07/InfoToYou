//MODEL DE Artigo

const Sequelize= require("sequelize")
const connection = require("./databases")
//Exportando a categoria
const Procedimento = require('./Procedimentos')

const Operacao =  connection.define('operacaos',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
        //Slug é o nome editavel que sairia o titulo para ultilizar na rota por exemplo
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})
//ligação um para muito
Procedimento.hasMany(Operacao)//Uma categoria tem muitos artigos
//Ligação 1 p 1
Operacao.belongsTo(Procedimento) //Um artigo pertence a uma categoria

//Arquivo foi removido para não tentar criar toda vez que o projeto rodar
//Sinconizar o model de relacionamento com as tabela no banco
Operacao.sync({force:true})//Criar a minha tabela sempre que eu criar a minha aplicação

module.exports= Operacao