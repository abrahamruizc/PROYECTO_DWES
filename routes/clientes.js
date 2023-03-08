var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var Cliente = require("../models/Cliente");
var db = mongoose.connection;
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const {body, validationResult} = require('express-validator');
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));


/*PETICION POST DE UN CLIENTE*/
router.post("/",[
  body('dni', 'Ingresa un dni valido').exists().isLength({min:8}),
  body('correo_electronico', 'Ingresa un email valido').exists().isEmail(),
  body('contrasenia', 'Ingresa una contraseña fuerte').exists().isStrongPassword(),
  body('nombre', 'Ingresa un nombre valido').exists().isLength({min:5}),
  body('apellidos', 'Ingresa un apellido valido').exists().isLength({min:5}),
  body('telefono', 'Ingresa un numero valido (9 digitos)').exists().isNumeric().isLength({min:9}),
  body('direccion', 'Ingresa una direccion valido').exists().isLength({min:10})
], function (req, res) {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
Cliente.create({
    dni: req.body.dni,
    correo_electronico: req.body.correo_electronico,
    contrasenia: req.body.contrasenia,
    nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
  }).then(Cliente => res.json(Cliente));
});



//PETICION GET DE TODOS LOS CLIENTES
router.get("/", function (req, res, next) {
  let { dni, correo_electronico, contrasenia, nombre, apellidos, telefono, direccion} = req.query;
  console.log(dni, correo_electronico, contrasenia, nombre, apellidos, telefono, direccion);
  console.log(req.query);
  let query = {};

  if (dni) {
    query.dni = dni;
  } else if (correo_electronico) {
    query.correo_electronico = correo_electronico;
  } else if (contrasenia) {
    query.contrasenia = contrasenia;
  }else if (nombre) {
    query.nombre = nombre;
  }else if (apellidos) {
    query.apellidos = apellidos;
  }else if (telefono) {
    query.telefono = telefono;
  }else if (direccion) {
    query.direccion = direccion;
  }
  
  Cliente.find(query)
    .exec(function (err, clienteinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(clienteinfo);
  });
});


// GET (obtener) del listado de cliente ordenados por fecha de creación
router.get("/fecha", function (req, res, next) {
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
router.post("/crear", function (req, res, next) {
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


// POST Comprueba si el usuario existe
router.post('/signin', function(req, res, next) {
  User.findOne({ username: req.body.username }, function(err, user) {
      if (err) res.status(500).send('¡Error comprobando el usuario!');
      // Si el usuario existe...
      if (user != null) {
          user.comparePassword(req.body.password, function(err, isMatch) {
              if (err) return next(err);
              // Si el password es correcto...
              if (isMatch)
                  res.status(200).send({ message: 'ok', role: user.role, id: user._id });
              else
                  res.status(200).send({ message: 'la password no coincide' });
          });
      } else res.status(401).send({ message: 'usuario no registrado' });
  });
});


module.exports = router;
