import mongoose from "mongoose";
var Schema = mongoose.Schema;


var  ServidorSchema = new Schema({
    nome: {
        type: String,
        required: 'informe o nome do servidor'
    },
    dtNascimento:{
        type: Date,
        required: 'informe a data de nascimento'
    }
});


module.exports = mongoose.model('Servidor', ServidorSchema);