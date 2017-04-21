var  HttpError = require('../error').HttpError;

module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render('index', {
            title: 'World'
        });
    });

    // app.post('/post', (req, res, next) => {
    //     if (Object.keys(req.body).length !== 0) {
    //         res.status(200).json(req.body);
    //     } else {
    //         next(new HttpError(404, 'Not found'));
    //     }
    // });
};

