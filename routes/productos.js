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

/*PETICION PUT DE UN PRODUCTO PARA ACTUALIZAR LOS DATOS DE UN PRODUCTO POR SU ID*/
router.put("/:id", function (req, res, next) {
  Producto.findByIdAndUpdate(
    req.params.id,
    req.body,
    function (err, productinfo) {
      if (err) res.status(500).send(err);
      else res.sendStatus(200);
    }
  );
});

/*PETICION DELETE DE UN PRODUCTO POR UNA ID*/
router.delete("/:id", function (req, res, next) {
  Producto.findByIdAndDelete(req.params.id, function (err, productinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

/*PETICION PUT DE PRODUCTO PARA AUMENTAR PRECIO 5%*/
router.put("/actualizar/precio", function (req, res, next) {
  Producto.updateMany(
    {},
    {$mul:{precio: 1.05}},
    function (err, productinfo) {
      if (err) res.status(500).send(err);
      else res.sendStatus(200);
    }
  );
});

/*PETICION GET DE PRODUCTO POR CANTIDAD <*/
router.get("/cantidad/:cantidad", function (req, res, next) {
  Producto.find({stock: {$lte: req.params.cantidad}}, function (err, productinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(productinfo);
  });
});



module.exports = router;
