var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var Producto = require("../models/Producto");
var db = mongoose.connection;

/*PETICION GET DE TODOS LOS PRODUCTOS(SIN FILTROS)*/
router.get("/", function (req, res, next) {
  Producto.find().exec(function (err, producs) {
    if (err) res.status(500).send(err);
    else res.status(200).json(producs);
  });
});

/*PETICION GET DE UN PRODUCTO POR UNA ID*/
router.get("/:id", function (req, res, next) {
  Producto.findById(req.params.id, function (err, productinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(productinfo);
  });
});

/*PETICION POST DE UN PRODUCTO*/
router.post("/", function (req, res, next) {
  Producto.create(req.body, function (err, productinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

/*PETICION DELETE DE UN PRODUCTO POR UNA ID*/
router.delete("/:id", function (req, res, next) {
  Producto.findByIdAndDelete(req.params.id, function (err, productinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

module.exports = router;
