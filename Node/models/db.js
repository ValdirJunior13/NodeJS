
const Sequelize = require('sequelize')
const sequelize = new Sequelize('SistemaDeCadastro', 'root', 'Omegamon37871145887', {
    host: "localhost",
    dialect: 'mysql'

})

module.exports = { 
    Sequelize: Sequelize,
    sequelize: sequelize
}