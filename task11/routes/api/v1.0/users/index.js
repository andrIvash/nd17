const express  = require('express'),
    app = module.exports = express(),
    HttpError = require('../../../../error').HttpError,
    config = require('../../../../config/index'),
    User = require('../../../../models/users').User;




app.get('/', (req, res) => {
    const mongoose = require('../../../../libs/mongoose');
    mongoose.connection.once('open', () => {
        User.find((err, users) => {
            if (err) res.send(new HttpError(500, err));
            res.send(new HttpError(200, users));
        });
    });
});

app.get('/:id', (req, res, next) => { //get /{userId}
    if (req.params.id ) {
        const mongoose = require('../../../../libs/mongoose');
        mongoose.connection.once('open', () => {
            User.findById(req.params.id, (err, user) =>{
                if (err) res.send(new HttpError(200, 'data not found'));
                res.send(user);
            });
        });
    } else {
        res.send(new HttpError(400, 'wronq query'));
    }
});

app.post('/', (req, res) => { //post  ?name=
    if (req.body.name) {
        const mongoose = require('../../../../libs/mongoose');
        mongoose.connection.once('open', () => {
            let user = new User({username: req.body.name});
            user.save(function (err, user) {
                if (err) res.send(new HttpError(500, err));
                res.send(new HttpError(200, 'user saved'));
            });
        });
    } else {
        res.send(new HttpError(400, 'wronq query'));
    }
});

app.patch('/:id', (req, res, next) => { //patch /{userId} ?name=
    if (req.params.id && req.query.name) {
        const mongoose = require('../../../../libs/mongoose');
        mongoose.connection.once('open', () => {
            User.findById(req.params.id, (err, user) =>{
                if (err) res.send(new HttpError(200, 'data not found'));
                user.username = req.query.name || user.username;
                user.save(function (err, user) {
                    if (err) res.send(new HttpError(500, err));
                    res.send(new HttpError(200, 'user saved'));
                });
            });
        });
    } else {
        res.send(new HttpError(400, 'wronq query'));
    }
});

app.delete('/:id', (req, res) => {
    if (req.params.id ) {
        const mongoose = require('../../../../libs/mongoose');
        mongoose.connection.once('open', () => {
            User.findByIdAndRemove(req.params.id, (err, user) =>{
                if (err) res.send(new HttpError(200, 'data not found'));
                res.send(new HttpError(200, `user ${req.params.id} deleted`));
            });
        });
    } else {
        res.send(new HttpError(400, 'wronq query'));
    }
});


