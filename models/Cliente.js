var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ClienteSchema = new Schema({
    dni: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    correo_electronico: {
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