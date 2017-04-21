
module.exports = function(app, io) {
    io.on('connection', function(socket){
        io.emit('chat message', 'user connected');
        socket.on('disconnect', function(){
            io.emit('chat message', 'user disconnected');
        });
        socket.on('chat message', function(msg){
            io.emit('chat message', msg);
        });
    });

    app.get('/', (req, res) => {
        res.render('index', {
            title: 'World'
        });
    });
};

