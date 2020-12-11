//Definir um model
//Fazendo importação
const Sequelize= require("sequelize")
const connection = require("./databases")
//Criando tabela pergunta
const Forum= connection.define('forum',{ 

    titulo:{
        type: Sequelize.STRING,
        allowNull:false
    },
   descricao:{
       type: Sequelize.TEXT,
       allowNull:false
   },
   idOp:{
       type: Sequelize.INTEGER,
       allowNull:true
   }
})

//criar tabela no banco
//Não vai forãr criação da tabela caso ja exista

Forum.sync({force: false}).then(()=>{
    console.log("Tabela Forum ok")
})

module.exports = Forum
