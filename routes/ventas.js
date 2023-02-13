
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Venta = require('../models/Venta');
var db = mongoose.connection;

// GET de todas las Ventas ordenadas por fecha de creación
router.get("/", function (req, res, next) {
  Venta.find()
    .sort("-creationdate")
    .populate("cliente")
    .populate("empleado")
    .exec(function (err, ventas) {
      if (err) res.status(500).send(err);
      else res.status(200).json(ventas);
    });
});

// GET de una única Venta por su ID
router.get("/:id", function (req, res, next) {
  Venta.findById(req.params.id)
  .sort("-creationdate")
  .populate("cliente")
  .populate("empleado")
  .exec(function (err, ventas) {
    if (err) res.status(500).send(err);
    else res.status(200).json(ventas);
  });
});

// GET de Ventas por Cliente
router.get("/cliente/:cliente", function (req, res, next) {
  Venta.find({cliente: req.params.cliente})
  .sort("-creationdate")
  .populate("cliente")
  .populate("empleado")
  .exec(function (err, ventas) {
    if (err) res.status(500).send(err);
    else res.status(200).json(ventas);
  });
});

// GET de Ventas por Empleado
router.get("/empleado/:empleado", function (req, res, next) {
  Venta.find({empleado: req.params.empleado})
  .sort("-creationdate")
  .populate("cliente")
  .populate("empleado")
  .exec(function (err, ventas) {
    if (err) res.status(500).send(err);
    else res.status(200).json(ventas);
  });
});

// GET de Ventas por fecha
router.get("/fecha/:fecha", function (req, res, next) {
  Venta.find({fecha: req.params.fecha})
  .sort("-creationdate")
  .populate("cliente")
  .populate("empleado")
  .exec(function (err, ventas) {
    if (err) res.status(500).send(err);
    else res.status(200).json(ventas);
  });
});

// POST de una nueva Venta
router.post("/", function (req, res, next) {
  Venta.create(req.body, function (err, venta) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// PUT de una Venta por su ID
router.put("/:id", function (req, res, next) {
  console.log(req.body);
  Venta.findByIdAndUpdate(
    req.params.id,
    req.body,
    function (err, venta) {
      if (err) res.status(500).send(err);
      else res.sendStatus(200);
    }
  );
});

// DELETE de una Venta existente por su ID
router.delete("/:id", function (req, res, next) {
  Venta.findByIdAndDelete(req.params.id, function (err, venta) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

module.exports = router;