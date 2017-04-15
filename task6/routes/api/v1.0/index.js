const express  = require('express');
const app = module.exports = express();
const  HttpError = require('../../../error').HttpError;

app.use('/users', require('./users'));
app.get('/', (req, res) => {
    res.send(new HttpError(400, 'wrong query'));
});
