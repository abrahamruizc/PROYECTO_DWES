var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs')
var SALT_WORK_FACTOR = 10;

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

ClienteSchema.pre('save',function(next){
    var cliente = this;
    // solo aplica una función hash al password si ha sido modificado (o es nuevo)
    if (!cliente.isModified('contrasenia ')) return next();
    // genera la salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // aplica una función hash al password usando la nueva salt
        bcrypt.hash(cliente.contrasenia, salt, function(err, hash) {
            if (err) return next(err);
            // sobrescribe el password escrito con el “hasheado”
            cliente.contrasenia = hash;
            next();
        });
    });
});

ClienteSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.contrasenia, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Cliente', ClienteSchema);