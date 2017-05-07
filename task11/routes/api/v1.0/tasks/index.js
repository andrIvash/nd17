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
    MongoClient.connect(uri, function(err, db) {
        if (err) throw new Error('connection to database is broken', err);
        const collection = db.collection('phones');
        collection.find().toArray((err, result) => {
            if (err) throw new Error('not found', err);
            res.send(result);
            db.close();
        });
    });
});
app.get('/:name', (req, res, next) => { //get /{name/surname/phone} ?value=<value>
    if (req.params.name && req.query.value) {
        MongoClient.connect(uri, function(err, db) {
            if (err) throw new Error('connection to database is broken', err);
            const collection = db.collection('phones');
            collection.find({[req.params.name]: req.query.value}).toArray((err, result) => {
                if (err) throw new Error('not found', err);
                if(result.length) {
                    res.send(result);
                } else {
                    res.send(new HttpError(200, 'data not found'));
                }
                db.close();
            });
        });
    } else {
        next(new HttpError(400, 'wronq query'));
    }
});

app.post('/', (req, res, next) => {
    if (req.body.name && req.body.surname && req.body.phone) {
        MongoClient.connect(uri, function(err, db) {
            if (err) throw new Error('connection to database is broken', err);
            const collection = db.collection('phones');
            let item = {
                name: req.query.name,
                surname: req.query.surname,
                phone: req.query.phone
            };
            collection.insert(item, (err, result) => {
                if (err)  throw new Error('can not insert', err);
                res.send(result);
                db.close();
            });
        });
    } else {
        next(new HttpError(400, 'wronq query'));
    }
});

app.patch('/:name', (req, res, next) => { //get /{name/surname/phone} ?value=<value>&name=&surname=&phone=
    if (req.params.name && req.query.value) {
        MongoClient.connect(uri, function(err, db) {
            if (err) throw new Error('connection to database is broken', err);
            const collection = db.collection('phones');
            collection.find({[req.params.name]: req.query.value}).toArray((err, result) => {
                if (err) throw new Error('not found', err);
                if(result.length) {
                    collection.update(
                        { [req.params.name]: req.query.value },
                        {
                            name: req.query.name,
                            surname: req.query.surname,
                            phone: req.query.phone
                        });
                    res.send(new HttpError(200, 'data update'));
                } else {
                    res.send(new HttpError(200, 'data not found'));
                }
                db.close();
            });
        });
    } else {
        next(new HttpError(400, 'wronq query'));
    }
});

app.delete('/:name', (req, res, next) => { //get /{name/surname/phone} ?value=<value>
    if (req.params.name && req.query.value) {
        MongoClient.connect(uri, function(err, db) {
            if (err) throw new Error('connection to database is broken', err);
            const collection = db.collection('phones');
            collection.find({[req.params.name]: req.query.value}).toArray((err, result) => {
                if (err) throw new Error('not found', err);
                if(result.length) {
                    collection.remove( { [req.params.name]: { $eq: req.query.value } } )
                    res.send(new HttpError(200, 'data deleted'));
                } else {
                    res.send(new HttpError(200, 'data not found'));
                }
                db.close();
            });
        });
    } else {
        next(new HttpError(400, 'wronq query'));
    }
});
