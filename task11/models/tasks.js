const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    async = require('async'),
    User = require('../models/users').User,
    HttpError = require('../error').HttpError;

// описание схемы вводимых данных
const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    userID: {
        type: String,
        required: false,
    }
});

schema.methods.checkStatus = function() {
    return this.status
};

schema.methods.delegate = function(userID, callback) {
    let Task = this;
    async.waterfall([
        function(callback) {
            User.findOne({_id: userID}, callback);
        },
        function(user, callback) {
            if (!user) {
                callback(new HttpError(400, 'user not found'));
            }
            Task.userID = userID;
            Task.save().then(
                callback(new HttpError(200, 'succesfully delegate')),
                callback(new HttpError(500, 'database fail'))
            )
        }
    ], callback);
};

exports.Note = mongoose.model('Task', schema);
