
var express = require('express');
var app = express();
var router = express.Router();

var mongoose = require('mongoose');
var Venta = require('../models/Venta');
var db = mongoose.connection;

const { body, validationResult } = require('express-validator');
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

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
router.post("/", [
  body('numero_venta', 'Ingresa un nº de venta válido').exists().isNumeric(),
  body('fecha', 'Ingresa una fecha válida').exists().isDate(),
  body('cliente', 'Ingresa un ID de cliente válido').exists(),
  body('empleado', 'Ingresa un ID de empleado válido').exists(),
  body('producto', 'Ingresa un producto válido').exists().isLength({ min: 8 }),
  body('cantidad', 'Ingresa una cantidad válida').exists().isNumeric(),
  body('precio', 'Ingresa un precio válido').exists().isNumeric()
], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    Venta.create({
      numero_venta: req.body.numero_venta,
      fecha: req.body.fecha,
      cliente: req.body.cliente,
      empleado: req.body.empleado,
      linea: {
        producto: req.body.producto,
        cantidad: req.body.cantidad,
        precio: req.body.precio
      }
    }).then(Venta => res.json(Venta)
    ).catch(error => res.json(error));
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