var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var Cliente = require("../models/Cliente");
var db = mongoose.connection;

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

/*
// POST de login de un cliente comprobando su usuario y contraseña

// Comprueba si el usuario existe
router.post("/signin", function (req, res, next) {
  Cliente.findOne({ username: req.body.username }, function (err, cliente) {
    if (err) res.status(500).send("!Error comprobando el usuario");
    // Si el usuario existe...
    if (user != null) {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) return next(err);
        // Si el password es correcto ...
        if (isMatch)
          res.status(200).send({ message: "la password no coincide" });
      });
    } else res.status(401).send({ message: "usuario no registrado" });
  });
});
*/
module.exports = router;
