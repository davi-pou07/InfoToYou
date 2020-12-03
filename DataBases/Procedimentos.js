//Definir um model
//Fazendo importação
const Sequelize= require("sequelize")
const connection = require("./databases")
//Criando tabela pergunta
const Procedimento=connection.define('procedimento',{
    proc_titulo:{
        type: Sequelize.STRING,
        allowNull:false
    },
    proc_descricao:{
        type: Sequelize.TEXT,
       allowNull:false
    }
})
Procedimento.sync({force: false}).then(()=>{
    console.log("Tabela criada manow")
})

module.exports = Procedimento