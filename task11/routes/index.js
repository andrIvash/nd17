const  HttpError = require('../error').HttpError;

module.exports = function(app) {
    app.use('/task-manager-api', require('./api'));
    app.get('/', (req, res) => {
        res.send(new HttpError(400, 'API is available on /task-manager-api'));
    })
};