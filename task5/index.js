//$ node task5/index.js
// http://localhost:3000/?firstname=ivan&lastname=ivanov


const http = require("http");
const port = 3000;

const params = (req) => {
    let q = req.url.split('?'),result={};
    if(q.length>=2){
        q[1].split('&').forEach((item)=>{
            try {
                result[item.split('=')[0]]=item.split('=')[1];
            } catch (e) {
                result[item.split('=')[0]]='';
            }
        })
    }
    return result;
};

const requestHandler = (req, res) => {

    req.params = params(req);
    if(req.params.firstname == undefined || req.params.lastname == undefined) {
        res.end('Enter parameters http://localhost:3000/?firstname= &lastname= ');
    } else {
        sendData({firstname: req.params.firstname, lastname: req.params.lastname})
            .then((data) => {
                res.end(JSON.stringify(data));
            })
    }

};

function sendData(data) {
    return new Promise(function(resolve, reject) {
        const resultData = {};
        const options = {
            host: 'netology.tomilomark.ru',
            port: 80,
            path: '/api/v1/hash',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Firstname': data.firstname
            }
        };
        const request = http.request(options, (res) => {
            //console.log('Status: ' + res.statusCode);
            //console.log('Headers: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (body) {
                resultData.firstname = data.firstname;
                resultData.lastname = data.lastname;
                resultData.hash = JSON.parse(body).hash;
                console.log('ok');
                resolve(resultData);
            });
        });
        request.on('error', e => {
            console.log('problem with request: ' + e.message);
            reject()
        });
        // write data to request body
        request.write(JSON.stringify({'lastname': data.lastname}));
        request.end();
    })

}


const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});



