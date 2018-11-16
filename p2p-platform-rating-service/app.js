const tf = require('@tensorflow/tfjs');

// Load the binding:
require('@tensorflow/tfjs-node');  // Use '@tensorflow/tfjs-node-gpu' if running with GPU.


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ratingEngineRouter = require('./routes/rating-engine');

var router = express.Router();
const port = 3000;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rating', ratingEngineRouter);

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

var server = app.listen(port, () => console.log(`P2P Rating Service listening on port ${port}!`));

process.on('SIGTERM', function onSigterm () {
    console.info('Got SIGTERM. Graceful shutdown start', new Date().toISOString());
    shutdown()
});
process.on('SIGINT', function onSigint () {
    console.info('Got SIGINT. Graceful shutdown start', new Date().toISOString());
    shutdown()
});

function shutdown() {
    router.get('/health', function(req, res, next) {
        res.status(503)
    });
    server.close(function onServerClosed (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.info('Server closed');
        /*closeMyResources(function onResourcesClosed (err) {
            console.info('Server closed');
          // error handling
            process.exit();
        })*/
    })
}

module.exports = app;
