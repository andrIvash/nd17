const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    async = require('async'),
    Task = require('../models/tasks').Task;

// описание схемы для добавления пользователя

const schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    }
});


schema.methods.checkTask = function(callback) {
    let User = this;
    Task.find({userID: User._id}, function(err, tasks) {
        if (err) return next(err);
        callback(tasks);
    });
};

exports.User = mongoose.model('User', schema);




