var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs')

const saltRoudns = 10;

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
    if(this.isNew || this.isModified('password')){
        const document= this
        bcrypt.hash(document.contrasenia, saltRoudns, (err, hashedPassword)=>{
            if(err){
                next(err);
            }else{
                document.contrasenia = hashedPassword
                next();
            }
        });
    }else{
        next();
    }
});

ClienteSchema.methods.isCorrectContrasenia = function(contrasenia, callback){
    bcrypt.compare(contrasenia, this.contrasenia, function(err, same){
        if(err){
            callback(err);
        }else{
            callback(err,same);
        }
    });
}

module.exports = mongoose.model('Cliente', ClienteSchema);