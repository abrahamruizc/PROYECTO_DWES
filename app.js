var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var productosRouter = require('./routes/productos');
var clientesRouter = require('./routes/clientes');
var ventasRouter = require('./routes/ventas');
var empleadosRouter = require('./routes/empleados');


var mongoose = require('mongoose');
mongoose.set('strictQuery', false); //requerido para quitar el warning
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

var db = mongoose.connection;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));

app.use('/', indexRouter);
app.use('/productos', productosRouter);
app.use('/clientes', clientesRouter);
app.use('/ventas', ventasRouter);
app.use('/empleados', empleadosRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;