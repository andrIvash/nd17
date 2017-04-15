// обработка rpc запросов
const users = require('../data');
const nconf = require('nconf');

module.exports = {
    get: function (data, obj) {
        if (data.id) {
            let id = findUser(parseFloat(data.id));
            if (id >= 0) {
                obj.onSuccess(users().get('users')[data.id]);
            } else {
                obj.onFailure('user not found');
            }
        } else {
            obj.onSuccess(users().get('users'));
        }
    },
    post: function (data, obj) {
        if (data.name && data.score) {
            let usersList = users().get('users');
            usersList.push({id: usersList.length + 1, name: data.name, score: data.score});
            nconf.set('users', usersList);
            nconf.save();
            obj.onSuccess('user add');
        } else {
            obj.onFailure('wronq query');
        }
    },
    put: function (data, obj) {
        if (data.id) {
            let id = findUser(parseFloat(data.id));
            if (id >= 0) {
                if (data.name && data.score) {
                    console.log('put');
                    let usersList = users().get('users');
                    usersList[id] = {id: usersList[id].id, name: data.name, score: data.score};
                    nconf.set('users', usersList);
                    nconf.save();
                    obj.onSuccess('user modify');
                } else {
                    obj.onFailure('wronq query');
                }
            } else {
                obj.onFailure('user not found');
            }
        } else {
            obj.onFailure('wronq query');
        }
    },
    delete: function (data, obj) {
        if (data.id) {
            let id = findUser(parseFloat(data.id));
            if (id >= 0) {
                let usersList = users().get('users');
                usersList.splice(id, 1);
                nconf.set('users', usersList);
                nconf.save();
                obj.onSuccess('user delete');
            } else {
                obj.onFailure('user not found');
            }
        } else {
            obj.onFailure('wronq query');
        }
    }
};

function findUser (id) {
    return users().get('users').findIndex((elem) => {
        return elem.id === id;
    })
}

