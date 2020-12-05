const Sequelize= require("sequelize")
const connection = require("./databases")

const Resposta=connection.define('resposta',{
    corpo:{
        type:Sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})
Resposta.sync({force:false}).then(()=>{
    console.log("Tabela Resposta ok")
})
module.exports = Resposta