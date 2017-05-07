var config = require('../config/index'),
    mongoose = require('mongoose');

//подкючение mongoose
mongoose.connect(`mongodb://${config().get('mongoose:user')}:${config().get('mongoose:password')}@${config().get('mongoose:uri')}`);
module.exports = mongoose;