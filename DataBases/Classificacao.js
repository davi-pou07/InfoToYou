const Sequelize = require("sequelize")
const connection = require("./databases")
const Operacao = require("./Operacao")
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
Classificacao.belongsTo(Operacao)

Classificacao.sync({ force: false }).then(() => {
    console.log("Tabela Classificacao ok")
})

module.exports = Classificacao