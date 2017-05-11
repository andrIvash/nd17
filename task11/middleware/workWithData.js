const mongoose = require('../libs/mongoose'),
    async = require('async');
var User = require('../models/users').User;

module.exports  = {
    open: () => {
        return new Promise((resolve) => {
            mongoose.connection.on('open', () => {
                resolve('подключились')
            });
        })},
    requireModels: (callback) => {
        require('./models/users');
        async.each(Object.keys(mongoose.models), function (modelName, callback) {
            mongoose.models[modelName].ensureIndexes(callback);
        }, callback);
    },
    createUsers: (callback) => {
        console.log('вставляем данные');
        var users = [
            {username: 'Vasya', tasksum: 3},
            {username: 'Ivan', tasksum: 2}
        ];
        async.each(users, function (userData, callback) {
            let user = new mongoose.models.User(userData);
            user.save(callback);
        }, callback);
    }
};
