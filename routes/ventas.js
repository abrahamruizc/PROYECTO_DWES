
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Venta = require('../models/Venta');
var db = mongoose.connection;

// GET por defecto. Si tiene una query de Cliente, Empleado o Fecha,
// se buscará aplicando dicho filtro. Si no, devolverá todas las Ventas
router.get("/", function (req, res, next) {
  let { cliente, empleado, fecha } = req.query;
  let query = {};

  if (cliente) {
    query.cliente = cliente;
  } else if (empleado) {
    query.empleado = empleado;
  } else if (fecha) {
    query.fecha = fecha;
  }
  
  Venta.find(query)
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