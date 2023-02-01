var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EmpleadoSchema = new Schema({
    ID_EMPLEADO: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
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
    encargado: {
        type: Boolean,
        required: true
    },
    n_ventas: {
        type: Number,
        required: true
    },
    salario: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('Empleado', EmpleadoSchema);