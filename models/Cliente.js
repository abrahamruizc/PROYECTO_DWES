var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ClienteSchema = new Schema({
    dni: {
        type: String,
        index: {
            unique: true
        }
    },
    correo_electronico: {
        type: String,
        required: true,
        index:{
            unique: true
        }
    },
    contrasenia: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    telefono: {
        type: Number
    },
    direccion: {
        type: String
    }
});


module.exports = mongoose.model('Cliente', ClienteSchema);