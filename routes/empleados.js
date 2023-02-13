var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Empleado = require('../models/Empleado');
var db = mongoose.connection;

/*OBTENER TODA LA LISTA DE EMPLEADOS*/
router.get("/", function (req, res, next) {
  Empleado.find().exec(function (err, employee) {
    if (err) res.status(500).send(err);
    else res.status(200).json(employee);
  });
});

/*OBTENER TODA LA LISTA DE EMPLEADOS BASADOS EN UN ID*/
router.get("/:id", function (req, res, next) {
  Empleado.findByID(req.params.id, function (err, employee) {
    if (err) res.status(500).send(err);
    else res.status(200).json(employee);
  });
});

/*OBTENER TODA LA LISTA DE EMPLEADOS BASADOS EN UN ID*/
router.post("/", function (req, res, next) {
  Empleado.create(req.body , function (err, employee) {
    if (err) res.status(500).send(err);
    else res.status(200);
  });
});

/*PETICION PUT PARA ACTUALIZAR UNO DE LOS EMPLEADOS BASADO EN EL ID*/
router.put("/:id", function (req, res, next) {
  Empleado.findByIdAndUpdate(
    req.params.id, req.body, function (err, employee) {
      if (err) res.status(500).send(err);
      else res.sendStatus(200);
    }
  );
});

/*PETICION DELETE DE UN EMPLEADO*/
router.delete("/:id", function (req, res, next) {
  Empleado.findByIdAndDelete(req.params.id, function (err, employee) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});




module.exports = router;