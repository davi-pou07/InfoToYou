//Definir um model
//Fazendo importação
const Sequelize= require("sequelize")
const connection = require("./databases")
//Criando tabela pergunta
const Comunicador= connection.define('comunicados',{
    titulo:{
        type: Sequelize.STRING,
        allowNull:true
    },
    comunicado:{
        type:Sequelize.TEXT,
        allowNull:true
    },
    status:{
        type: Sequelize.STRING,
        allowNull:true
    },
    importancia:{
        type: Sequelize.STRING,
        allowNull:true
    },
    dataDeExpiracao:{
        type: Sequelize.DATE,
        allowNull:true
    }  
})

//importancia e data de expiração

Comunicador.sync({force: false}).then(()=>{
    console.log("Tabela Comunicados ok")
})

module.exports = Comunicador
