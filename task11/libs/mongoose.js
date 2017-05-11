var config = require('../config/index'),
    mongoose = require('mongoose'),
    HttpError = require('../error').HttpError;

//подкючение mongoose
mongoose.connect(`mongodb://${config().get('mongoose:user')}:${config().get('mongoose:password')}@${config().get('mongoose:uri')}`, (err) => {
    if(err) throw  new HttpError(500, 'error database')
});
module.exports = mongoose;