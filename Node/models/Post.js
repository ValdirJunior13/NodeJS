const db = require('./db')

const Post = db.sequelize.define('SistemaDeCadastro', {
    titulo: {
        type: db.Sequelize.STRING
    },
        mensagem: {
        type: db.Sequelize.TEXT
    }

})
module.exports = Post 