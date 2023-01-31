var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    stock: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Producto', ProductoSchema);
