const express  = require('express');
const app = module.exports = express();
var  HttpError = require('../../error').HttpError;

app.use('/v1.0', require('./v1.0')); // REST

app.get('/', (req, res) => {
    res.send(new HttpError(400, 'api ok, please choose version /v1.0 '));
});