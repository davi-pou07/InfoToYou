const Sequelize = require("sequelize")
const connection = require("./databases")

const Classificacao = connection.define('classificacao', {
    id_op: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    classi: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})
Classificacao.sync({ force: false }).then(() => {
    console.log("Tabela Classificacao ok")
})
module.exports = Classificacao