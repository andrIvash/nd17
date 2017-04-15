const express = require('express'),
    app = require('express')(),
    http = require('http'),
    path = require('path'),
    util = require('util'),
    errorHandler = require('errorhandler'),
    config = require('./config/'),
    bodyParser = require('body-parser');

global = {
    users: [
        {
            "id": 1,
            "name": "one",
            "score": 25
        },
        {
            "id": 2,
            "name": "one",
            "score": 25
        },
        {
            "id": 3,
            "name": "one",
            "score": 25
        }
    ]
};

// view engine setup
app.set('views', path.join(__dirname, '/templates'));
app.set('view engine', 'pug');

//req.body доступ к данным
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// подключение middleware
app.use(require('./middleware/sendHttpError'));

//подключение routes
require('./routes')(app);

//--------------------  обработка ошибки  ------------------//
var  HttpError = require('./error/').HttpError;
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new HttpError(400, 'wrong query');
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
http.createServer(app).listen(config().get('port'), function(){  // запускаем сервер
    console.log('express server listening on port : ' + config().get('port'));
});
