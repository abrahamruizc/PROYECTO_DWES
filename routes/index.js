var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Plantitas_SL' });
});

/* GET del layout validacion de producto */
router.get('/productos.ejs', function(req, res, next) {
  res.render('productos', { title: 'Plantitas_SL', layout: './productos.ejs' });
});

/* GET del layout validaciones cliente */
router.get('/clientes.ejs', function(req, res, next) {
  res.render('clientes', { title: 'Plantitas_SL', layout: './clientes.ejs' });
});

/* GET del layout validaciones Venta */
router.get('/ventas.ejs', function(req, res, next) {
  res.render('ventas', { title: 'Plantitas_SL', layout: './ventas.ejs' });
});

module.exports = router;
