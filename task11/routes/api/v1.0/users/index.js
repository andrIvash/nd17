const express  = require('express'),
    app = module.exports = express(),
    HttpError = require('../../../../error').HttpError,
    config = require('../../../../config/index'),
    User = require('../../../../models/users').User;

 const mongoose = require('mongoose');

//подкючение mongoose

app.get('/', (req, res) => {

});

app.post('/', (req, res) => {
    mongoose.connect(`mongodb://${config().get('mongoose:user')}:${config().get('mongoose:password')}@${config().get('mongoose:uri')}`);


    mongoose.connection.once('open', () => {
        console.log('подключились');
        let user = new User({username: 'Vasya'});
        user.save((err) => {
            if(err) res.send(new HttpError(500, 'cannot save'));
            res.send(new HttpError(200, 'data saved'));
            mongoose.disconnect();
        });

    });

});

