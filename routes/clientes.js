
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Cliente= require('../models/Cliente');
var db = mongoose.connection;


// GET del listado de usuarios ordenados por fecha de creación
router.get('/', function(req, res, next) {
  Cliente.find().sort('-creationdate').exec(function(err, clients) {
  if (err) res.status(500).send(err);
  else res.status(200).json(clients);
  });
  });

// GET de un único usuario por su Id
router.get('/:id', function(req, res, next) {
  Cliente.findById(req.params.id, function(err, clientinfo) {
  if (err) res.status(500).send(err);
  else res.status(200).json(clientinfo);
  });
  });


// POST de un nuevo usuario
router.post('/', function(req, res, next) {
  Cliente.create(req.body, function(err, clientinfo) {
  if (err) res.status(500).send(err);
  else res.sendStatus(200);
  });
  });


// PUT de un usuario existente identificado por su Id
router.put('/:id', function(req, res, next) {
  Cliente.findByIdAndUpdate(req.params.id, req.body, function(err,
    clientinfo) {
  if (err) res.status(500).send(err);
  else res.sendStatus(200);
  });
  });

// DELETE de un usuario existente identificado por su Id

router.delete("/borrar:id", function (req, res, next) {
  Cliente.findByIdAndDelete(req.params.id, function (err, clientinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});
module.exports = router;