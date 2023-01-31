var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TiendaSchema = new Schema({
    direccion: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    horario: {
        type: String
    },
    telefonoContacto: {
        type: Number
    },
    festivos: {
        type: String
    }
});

module.exports = mongoose.model('Producto', TiendaSchema);