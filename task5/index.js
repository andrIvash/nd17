//andrivash$ node task5/index.js firstname lastname

var http = require("http");

var userData = ({
    'firstname' : process.argv[2],
    'lastName': process.argv[3]
});

var options = {
    host: 'netology.tomilomark.ru',
    port: 80,
    path: '/api/v1/hash',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Firstname': userData.firstname
    }
};
var req = http.request(options, function(res) {
    //console.log('Status: ' + res.statusCode);
    //console.log('Headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (body) {
        console.log({
            "firstName": userData.firstname,
            "lastName": userData.lastName,
            "secretKey": JSON.parse(body).hash
        });
    });
});
req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});
// write data to request body
req.write(JSON.stringify({'lastname': userData.lastName}));
req.end();