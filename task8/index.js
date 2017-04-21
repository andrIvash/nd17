const express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    util = require('util'),
    server = http.createServer(app),
    errorHandler = require('errorhandler'),
    config = require('./config/'),
    bodyParser = require('body-parser');
    io = require('socket.io').listen(server);




// view engine setup
app.set('views', path.join(__dirname, '/templates'));
app.set('view engine', 'pug');


//req.body доступ к данным
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'public')));

// подключение middleware
app.use(require('./middleware/sendHttpError'));


//подключение routes
require('./routes')(app, io);

//--------------------  обработка ошибки  ------------------//
var  HttpError = require('./error/').HttpError;
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new HttpError(404, 'The page is not found');
    next(err);
});

// error handlers
app.use(function(err, req, res, next) {
    if (typeof err == 'number') {
        err = new HttpError(err);
    }
    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') === 'development') {
            var errorhandler = errorHandler();
            errorhandler(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});


//-------------------------запуск сервера ----------------------------//
server.listen(config().get('port'), function(){  // запускаем сервер
    console.log('express server listening on port : ' + config().get('port'));
});
