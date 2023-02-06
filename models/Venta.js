var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaSchema = new Schema({
    numero_venta: {
        type: Number,
        required: true,
        index: {
            unique: true
        }
    },
    fecha: {
        type: Date,
        required: true
    },
    cliente: {
        type: Schema.ObjectId,
        ref: 'Cliente',
        required: true
    },
    empleado: {
        type: Schema.ObjectId,
        ref: 'Empleado',
        required: true
    },
    linea: {
        type: {
            producto: {
                type: String,
                required: true
            },
            cantidad: {
                type: Number,
                required: true
            },
            precio: {
                type: Number,
                required: true
            }
        },
        required: true
    }
});

module.exports = mongoose.model('Venta', VentaSchema);