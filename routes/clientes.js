
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Cliente= require('../models/Cliente');
var db = mongoose.connection;


// GET del listado de usuarios ordenados por fecha de creación
router.get('/', function(req, res, next) {
  Cliente.find().sort('-creationdate').exec(function(err, users) {
  if (err) res.status(500).send(err);
  else res.status(200).json(users);
  });
  });

// GET de un único usuario por su Id
router.get('/:id', function(req, res, next) {
  Cliente.findById(req.params.id, function(err, userinfo) {
  if (err) res.status(500).send(err);
  else res.status(200).json(userinfo);
  });
  });


// POST de un nuevo usuario
router.post('/', function(req, res, next) {
  Cliente.create(req.body, function(err, userinfo) {
  if (err) res.status(500).send(err);
  else res.sendStatus(200);
  });
  });


// PUT de un usuario existente identificado por su Id
router.put('/:id', function(req, res, next) {
  Cliente.findByIdAndUpdate(req.params.id, req.body, function(err,
  userinfo) {
  if (err) res.status(500).send(err);
  else res.sendStatus(200);
  });
  });

// DELETE de un usuario existente identificado por su Id
router.delete('/:id', function(req, res, next) {
  Cliente.findByIdAndDelete(req.params.id, function(err, userinfo) {
  if (err) res.status(500).send(err);
  else res.sendStatus(200);
  });
  });
module.exports = router;