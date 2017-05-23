const express  = require('express');
const app = module.exports = express();
const fs = require('fs');
const nconf = require('nconf');
const  HttpError = require('../../../../error').HttpError;
const data = require('../../../../data');


app.get('/', (req, res) => {
    res.send(data().get('users'));
});
app.get('/:id', (req, res, next) => {
    if (!isNaN(parseFloat(req.params.id)) && isFinite(req.params.id)) {
        let id = findUser(parseFloat(req.params.id));
        if (id >= 0) {
            res.send(data().get('users')[id]);
        } else {
            next(new HttpError(200, 'user not found'));
        }
    } else {
        next(new HttpError(400, 'wronq query'));
    }
});

app.post('/', (req, res, next) => {
    if (req.body.name && req.body.score) {
        const users = data().get('users');
        users.push({id: users.length + 1, name: req.body.name, score: req.body.score});
        nconf.set('users', users);
        nconf.save();
        res.send({status:'ok', message: 'users add'})
    } else {
        next(new HttpError(400, 'wronq query'));
    }
});

app.patch('/:id', (req, res,  next) => {
    if (!isNaN(parseFloat(req.params.id)) && isFinite(req.params.id)) {
        let id = findUser(parseFloat(req.params.id));
        if (id >= 0) {
            if (req.query.name && req.query.score) {
                const users = data().get('users');
                users[id] = {id: users[id].id, name: req.query.name, score: req.query.score};
                nconf.set('users', users);
                nconf.save();
                res.send('user modify');
            }
        } else {
            next(new HttpError(200, 'user not found'));
        }
    } else {
        next(new HttpError(400, 'wronq query'));
    }
});

app.delete('/:id', (req, res, next) => {
    if (!isNaN(parseFloat(req.params.id)) && isFinite(req.params.id)) {
        let id = findUser(parseFloat(req.params.id));
        if (id >= 0) {
            const users = data().get('users');
            users.splice(id, 1);
            nconf.set('users', users);
            nconf.save();
            res.send({status:'ok', message: 'user delete'});
        } else {
            next(new HttpError(200, 'user not found'));
        }
    } else {
        next(new HttpError(400, 'wronq query'));
    }
});

function findUser(id) {
    return data().get('users').findIndex((elem) => {
        return elem.id === id;
    })
}