var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var Empleado = require("../models/Empleado");
var db = mongoose.connection;

/*OBTENER TODA LA LISTA DE EMPLEADOS BASADOS EN UN ID*/
router.get("/:id", function (req, res, next) {
  Empleado.findById(req.params.id, function (err, employee) {
    if (err) res.status(500).send(err);
    else res.status(200).json(employee);
  });
});

/*OBTENER LISTAS A PARTIR DE UNA QUERY*/
router.get("/", function (req, res, next) {
  let { dni, encargado } = req.query;
  let query = {};

  if (dni) {
    query.dni = dni;
  } else if (encargado) {
    query.encargado = encargado;
  }

  Empleado.find(query).exec(function (err, employee) {
    if (err) res.status(500).send(err);
    else res.status(200).json(employee);
  });
});

/*OBTENER LA LISTA DE EMPLEADOS N_VENTAS < X*/
router.get("/nventasmenor/:n_ventas", function (req, res, next) {
  Empleado.find(
    { n_ventas: { $lte: req.params.n_ventas } },
    function (err, employee) {
      if (err) res.status(500).send(err);
      else res.status(200).json(employee);
    }
  );
});

/*OBTENER LA LISTA DE EMPLEADOS N_VENTAS < X*/
router.get("/nventasmayor/:n_ventas", function (req, res, next) {
  Empleado.find(
    { n_ventas: { $gte: req.params.n_ventas } },
    function (err, employee) {
      if (err) res.status(500).send(err);
      else res.status(200).json(employee);
    }
  );
});

/*OBTENER LA LISTA DE EMPLEADOS N_VENTAS < X*/
router.get("/salariomenor/:salario", function (req, res, next) {
  Empleado.find(
    { salario: { $lte: req.params.salario } },
    function (err, employee) {
      if (err) res.status(500).send(err);
      else res.status(200).json(employee);
    }
  );
});

/*OBTENER LA LISTA DE EMPLEADOS N_VENTAS > X*/
router.get("/salariomayor/:salario", function (req, res, next) {
  Empleado.find(
    { salario: { $gte: req.params.salario } },
    function (err, employee) {
      if (err) res.status(500).send(err);
      else res.status(200).json(employee);
    }
  );
});

/*OBTENER TODA LA LISTA DE EMPLEADOS BASADOS EN UN ID*/
router.post("/", function (req, res, next) {
  Empleado.create(req.body, function (err, employee) {
    if (err) res.status(500).send(err);
    else res.status(200);
  });
});

/*PETICION PUT PARA ACTUALIZAR UNO DE LOS EMPLEADOS BASADO EN EL ID*/
router.put("/:id", function (req, res, next) {
  Empleado.findByIdAndUpdate(req.params.id, req.body, function (err, employee) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

/*PETICION DELETE DE UN EMPLEADO*/
router.delete("/:id", function (req, res, next) {
  Empleado.findByIdAndDelete(req.params.id, function (err, employee) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

module.exports = router;
