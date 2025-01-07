const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
mongoose.connect = ("mongodb://localhost/mongoTeste", {
    useMongoClient: true
})
const UsuariosSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    id: {
        type: Number
    },
    email: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    }
})


mongoose.model('usuarios', UsuariosSchema)
const Valdir = mongoose.model('usuarios')
new Valdir({
    nome: 'Valdir',
    id: 15,
    email: 'v.zacarias@hotmail.com.br',
    idade: 23
    
})