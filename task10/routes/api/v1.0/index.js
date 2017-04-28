const express  = require('express');
const app = module.exports = express();
const  HttpError = require('../../../error').HttpError;

app.use('/phones', require('./phones'));
app.get('/', (req, res) => {
    res.send(new HttpError(400, 'wrong query'));
});