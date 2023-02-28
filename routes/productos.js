var express = require("express");
var router = express.Router();
var {body, validationResult} = require('express-validator');
var mongoose = require("mongoose");
var Producto = require("../models/Producto");
var db = mongoose.connection;

/*PETICION GET DE TODOS LOS PRODUCTOS(SIN FILTROS)*/
// router.get("/", function (req, res, next) {
//   Producto.find().exec(function (err, producs) {
//     if (err) res.status(500).send(err);
//     else res.status(200).json(producs);
//   });
// });

/*PETICION GET DE UN PRODUCTO POR UNA ID*/
router.get("/:id", function (req, res, next) {
  Producto.findById(req.params.id, function (err, productinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(productinfo);
  });
});

/*PETICION POST DE UN PRODUCTO*/
router.post("/",[
  body('nombre', 'Ingresa un nombre valido').exists().isLength({min:8}),
  body('stock', 'Ingresa un numero de stock valido').exists().isNumeric(),
  body('precio', 'Ingresa un precio valido').exists().isNumeric()
], function (req, res) {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  Producto.create({
      nombre: req.body.nombre,
      stock: req.body.stock,
      precio: req.body.precio,
    }).then(Producto => res.json(Producto));
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


router.put("/actualizar/precio/:nombre", function (req, res, next) {
  Producto.updateOne(
    {nombre: req.params.nombre},
    {$mul:{precio: 1.10}},
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

/*PETICION GET DE TODOS LOS PRODUCTOS PUDIENDO USAR QUERYS, 
SIN SU USO MUESTRA TODA LA INFORMACION DE LA COLECCION (SIN FILTROS)*/
router.get("/", function (req, res, next) {
  let { nombre, stock, precio } = req.query;
  console.log(nombre, stock, precio);
  console.log(req.query);
  let query = {};

  if (nombre) {
    query.nombre = nombre;
  } else if (stock) {
    query.stock = stock;
  } else if (precio) {
    query.precio = precio;
  }
  
  Producto.find(query)
    .exec(function (err, productinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(productinfo);
  });
});


// OTRA FORMA DE HACERLO
// router.get("/", function (req, res, next) {
//   let parametro = req.query.nombre;
//   console.log(parametro);
//   let parametrodebusqueda = "nombre";
//   if (parametro == null){
//     parametro = req.query.stock;
//     console.log(parametro);
//     parametrodebusqueda = "stock";
//     if (parametro == null){
//       parametro = req.query.precio;
//       console.log(parametro);
//       parametrodebusqueda = "precio";
//       if (parametro == null){
//         parametrodebusqueda = "";
//       }
//     }
//   }

//   switch (parametrodebusqueda) {
//     case "nombre":
//       Producto.find({nombre: parametro})
//       .exec(function (err, ventas) {
//         if (err) res.status(500).send(err);
//         else res.status(200).json(ventas);
//       });
//       break;
//     case "stock":
//       Producto.find({stock: parametro})
//       .exec(function (err, ventas) {
//         if (err) res.status(500).send(err);
//         else res.status(200).json(ventas);
//       });
//       break;
//     case "precio":
//       Producto.find({precio: parametro})
//       .exec(function (err, ventas) {
//         if (err) res.status(500).send(err);
//         else res.status(200).json(ventas);
//       });
//       break;
    
//     default:
//       console.log("entra");
//       Producto.find().exec(function (err, producs) {
//         if (err) res.status(500).send(err);
//         else res.status(200).json(producs);
//       });
//   }

// });

module.exports = router;
