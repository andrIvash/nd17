
var nconf = require('nconf'),
    path = require('path');

module.exports = function() {
    nconf.stores.env.readOnly = false;
    return nconf.argv()
        .env()
        .file({file: path.join(__dirname, 'users.json')})
};

