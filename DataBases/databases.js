//Criar modulo sequelize
const Sequelize = require('sequelize')

//Criar coneão com banco
const connection = new Sequelize('infotoyou', 'root', 'davi6259', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00' // for writing to database
})

//exportar conexão
module.exports = connection;