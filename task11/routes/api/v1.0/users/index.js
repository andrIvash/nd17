const express  = require('express'),
    app = module.exports = express(),
    HttpError = require('../../../../error').HttpError,
    config = require('../../../../config/index'),
    User = require('../../../../models/users').User;



//подкючение mongoose

app.get('/', (req, res) => {
    const mongoose = require('../../../../libs/mongoose');
    mongoose.connection.once('open', () => {
        User.find((err, users) => {
            if (err) res.send(new HttpError(500, err));
            res.send(new HttpError(200, users));
            mongoose.disconnect();
        });
    });
});

app.post('/', (req, res) => {
    const mongoose = require('../../../../libs/mongoose');
    mongoose.connection.once('open', () => {
        let user = new User({username: 'Vasya'});
        user.save(function (err, user) {
            if (err) res.send(new HttpError(500, err));
            res.send(new HttpError(200, 'user saved'));
            mongoose.disconnect();
        });

    });
});

