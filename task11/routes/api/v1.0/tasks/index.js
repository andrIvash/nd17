const express  = require('express'),
    app = module.exports = express(),
    HttpError = require('../../../../error').HttpError,
    config = require('../../../../config/index'),
    Task = require('../../../../models/tasks').Task;




app.get('/', (req, res) => {
    const mongoose = require('../../../../libs/mongoose');
    mongoose.connection.once('open', () => {
        Task.find((err, tasks) => {
            if (err) res.send(new HttpError(500, err));
            res.send(new HttpError(200, tasks));
            mongoose.disconnect();
        });
    });
});

app.get('/:id', (req, res, next) => { //get /{taskId}
    if (req.params.id ) {
        const mongoose = require('../../../../libs/mongoose');
        mongoose.connection.once('open', () => {
           Task.findById(req.params.id, (err, task) =>{
                if (err) res.send(new HttpError(200, 'data not found'));
                res.send(task);
                mongoose.disconnect();
            });
        });
    } else {
        res.send(new HttpError(400, 'wronq query'));
    }
});

app.post('/', (req, res) => { //post  ?title=&description=&status=&userID
    if (req.body.title) {
        const mongoose = require('../../../../libs/mongoose');
        mongoose.connection.once('open', () => {
            let task = new Task({
                title: req.body.title,
                description: req.body.description || '',
                status: req.body.status || false,
                userID: req.body.userID || ''
            });
            task.save(function (err, task) {
                if (err) res.send(new HttpError(500, err));
                res.send(new HttpError(200, 'task saved'));
                mongoose.disconnect();
            });
        });
    } else {
        res.send(new HttpError(400, 'wronq query'));
    }
});

app.patch('/:id', (req, res, next) => { //patch /{tasId} ?title=&description=&status=&userID
    if (req.params.id && req.query.title) {
        const mongoose = require('../../../../libs/mongoose');
        mongoose.connection.once('open', () => {
            Task.findById(req.params.id, (err, task) =>{
                if (err) res.send(new HttpError(200, 'data not found'));
                task.title = req.body.title;
                task.description = req.body.description || null;
                task.status = req.body.status || false;
                task.userID = req.body.userID || null;
                task.save(function (err, task) {
                    if (err) res.send(new HttpError(500, err));
                    res.send(new HttpError(200, 'task saved'));
                    mongoose.disconnect();
                });
            });
        });
    } else {
        res.send(new HttpError(400, 'wronq query'));
    }
});

app.delete('/:id', (req, res) => { //delete /{taskId}
    if (req.params.id) {
        const mongoose = require('../../../../libs/mongoose');
        mongoose.connection.once('open', () => {
            Task.findByIdAndRemove(req.params.id, (err, task) =>{
                if (err) res.send(new HttpError(200, 'data not found'));
                res.send(new HttpError(200, `task ${req.params.id} deleted`));
                mongoose.disconnect();
            });
        });
    } else {
        res.send(new HttpError(400, 'wronq query'));
    }
});


