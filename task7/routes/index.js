var  HttpError = require('../error').HttpError;

module.exports = function(app) {
    app.get('/', (req, res) => {
        res.status(200).send('Hello, Express.js');
    });

    app.get('/hello', (req, res) => {
        res.status(200).send('Hello stranger!');
    });

    app.get('/hello/:name', (req, res) => {
        res.status(200).send(`Hello, ${req.params.name} ! `);
    });

    app.all('/sub/*', (req, res) => {
        res.status(200).send(`You requested URI: ${req.originalUrl}`);
    });

    app.post('/post', (req, res, next) => {
        if (Object.keys(req.body).length !== 0) {
            res.status(200).json(req.body);
        } else {
            next(new HttpError(404, 'Not found'));
        }
    });
};

