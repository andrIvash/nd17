// обработка вывода ошибки
module.exports = function(req, res, next) {
    res.sendHttpError = function(error) {
        res.status(error.status);
        if (res.req.headers['x-requested-with'] == 'XMLHttpRequest') {
            res.json(error);
            //res.send('error')
        } else {
            res.render('error', {message: 'error', error: error});
        }

    };
    next();
};