var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var Cliente = require("../models/Cliente");
var db = mongoose.connection;
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// GET (obtener) del listado de cliente ordenados por fecha de creación
router.get("/", function (req, res, next) {
  Cliente.find()
    .sort("-creationdate")
    .exec(function (err, clients) {
      if (err) res.status(500).send(err);
      else res.status(200).json(clients);
    });
});

// GET (obtener) de un único cliente por su Id
router.get("/:id", function (req, res, next) {
  Cliente.findById(req.params.id, function (err, clientinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(clientinfo);
  });
});

// GET (obtener) de un único cliente por su correo_electronico
router.get("/email/:correo_electronico", function (req, res, next) {
  Cliente.find({correo_electronico: req.params.correo_electronico}).exec(function (err, clientinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(clientinfo);
  });
});

// POST (crear) de un nuevo cliente
router.post("/", function (req, res, next) {
  Cliente.create(req.body, function (err, clientinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// PUT (actualizar )de un cliente existente identificado por su Id
router.put("/:id", function (req, res, next) {
  Cliente.findByIdAndUpdate(
    req.params.id,
    req.body,
    function (err, clientinfo) {
      if (err) res.status(500).send(err);
      else res.sendStatus(200);
    }
  );
});

// DELETE (eliminar) de un cliente existente identificado por su Id

router.delete("/:id", function (req, res, next) {
  Cliente.findByIdAndDelete(req.params.id, function (err, clientinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});


// POST de Registro y Login

router.post("/:register", function(req,res){
  const {dni,correo_electronico, contrasenia,nombre,apellidos,telefono,direccion} = req.body;

  const cliente = new Cliente({dni,correo_electronico, contrasenia,nombre,apellidos,telefono,direccion});

  cliente.save(err =>{
    if(err){
      res.status(500).send('ERROR AL REGISTRAR AL USUARIO')

    }else{
      res.status(200).send('USUARIO REGISTRADO')

    }
  });

});


router.post("/:login", function(req,res){
  const {correo_electronico, contrasenia} = req.body;

  Cliente.findOne({correo_electronico}, function(err, clientinfo){
    if(err){
      res.status(500).send('ERROR AL LOGEARSE CON ESE USUARIO')
    }else if(!clientinfo){
      res.status(500).send('EL USUARIO NO EXISTE')
    }else{
      Cliente.isCorrectContrasenia(contrasenia, function(err, result){
        if(err){
          res.status(500).send('ERROR AL LOGEARSE')
        }else if(result){
          res.status(200).send('USUARIO REGISTRADO CORRECTAMENTE')
        }else{
          res.status(500).send('CORREO Y/O CONTRASEÑA INCORRECTA')
        }
      });
    }
  });

});

module.exports = router;
