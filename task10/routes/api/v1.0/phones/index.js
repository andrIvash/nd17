const express  = require('express'),
    app = module.exports = express(),
    fs = require('fs'),
    nconf = require('nconf'),
    config = require('../../../../config/'),
    HttpError = require('../../../../error').HttpError,
    mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient;

const uri = `mongodb://${config().get('user')}:${config().get('password')}@ds021182.mlab.com:21182/my-test`;

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
    console.log(req.body, req.params, req);
    if (req.body.name && req.body.score) {
        const users = data().get('users');
        users.push({id: users.length + 1, name: req.body.name, score: req.body.score});
        nconf.set('users', users);
        nconf.save();
        res.send('users add')
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
            res.send('user delete');
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


// MongoClient.connect(uri, function(err, db) {
//     if(err) throw new Error('connection to database is broken', err);
//
//     console.log('connection to database was performed');
//     const collection = db.collection('users');
//
//     let user1 = {name: 'John'};
//     let user2 = {name: 'David'};
//     let user3 = {name: 'Steve'};
//
//     collection.insert([user1, user2, user3], (err, result) => {
//         if (err)  throw new Error('can not insert', err);
//         showData(collection,{});
//         collection.update({name: 'Steve'}, {$set: {name: 'Superman'}});
//         showData(collection,{});
//         collection.remove({name : 'Superman'});
//         showData(collection,{});
//         collection.remove();
//         db.close();
//     });
// });
//
// function showData(collection, query) {
//     collection.find(query).toArray((err, result) => {
//         if (err) throw new Error('not found', err);
//         console.log(result);
//     });
// }