//Definir um model
//Fazendo importação
const Sequelize= require("sequelize")
const connection = require("./databases")
//Criando tabela pergunta
const Info= connection.define('info',{ 

    titulo:{
        type: Sequelize.STRING,
        allowNull:false
    },
   descricao:{
       type: Sequelize.TEXT,
       allowNull:false
   }
})
//criar tabela no banco
//Não vai forãr criação da tabela caso ja exista

Info.sync({force: false}).then(()=>{
    console.log("Tabela criada")
})
//exportando model
module.exports = Info
