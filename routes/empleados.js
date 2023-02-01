var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Employee = require('../models/Empleado');
var db = mongoose.connection;

/* GET employees listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;