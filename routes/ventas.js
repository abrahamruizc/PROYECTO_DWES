
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Venta = require('../models/Venta');
var db = mongoose.connection;

// GET por defecto. Si tiene una query de Cliente, Empleado o Fecha,
// se búscara aplicando dicho filtro. Si no, devolverá todas las Ventas
router.get("/", function (req, res, next) {
  let parametro = req.query.cliente;
  let parametroBusqueda = "cliente";
  if (parametro == null) {
    parametro = req.query.empleado;
    parametroBusqueda = "empleado";
    if (parametro == null) {
      parametro = req.query.fecha;
      parametroBusqueda = "fecha";
      if (parametro == null) {
        parametroBusqueda = "";
      }
    }
  }
  
  switch (parametroBusqueda) {
    case "cliente":
      Venta.find({cliente: parametro})
      .sort("-creationdate")
      .populate("cliente")
      .populate("empleado")
      .exec(function (err, ventas) {
        if (err) res.status(500).send(err);
        else res.status(200).json(ventas);
      });
      break;

    case "empleado":
      Venta.find({empleado: parametro})
      .sort("-creationdate")
      .populate("cliente")
      .populate("empleado")
      .exec(function (err, ventas) {
        if (err) res.status(500).send(err);
        else res.status(200).json(ventas);
      });
      break;

    case "fecha":
      Venta.find({fecha: parametro})
      .sort("-creationdate")
      .populate("cliente")
      .populate("empleado")
      .exec(function (err, ventas) {
        if (err) res.status(500).send(err);
        else res.status(200).json(ventas);
      });
      break;

    default:
      Venta.find()
      .sort("-creationdate")
      .populate("cliente")
      .populate("empleado")
      .exec(function (err, ventas) {
        if (err) res.status(500).send(err);
        else res.status(200).json(ventas);
      });
      break;
  }
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