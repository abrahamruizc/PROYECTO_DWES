var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Plantitas_SL' });
});

/* GET del layout validaciones cliente */
router.get('/clientes.ejs', function(req, res, next) {
  res.render('clientes', { title: 'Plantitas_SL', layout: './clientes.ejs' });
});

/* GET del layout validaciones productos */
router.get('/productos.ejs', function(req, res, next) {
  res.render('productos', { title: 'Plantitas_SL', layout: './productos.ejs' });
});
module.exports = router;
