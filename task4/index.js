const Readable = require('stream').Readable;
const Writable = require('stream').Writable;
const Transform = require('stream').Transform;

class ClassReadable extends Readable {
    constructor(options) {
        super(options);
        this.count = 0;
    };
    _read(size) { //HighWaterMark
        setTimeout(() => {
            this.count++;
            this.push(this.count + ' | ' + size.toString());
        }, 1000 * 1);
    }
}

class ClassWritable extends Writable {
    constructor(options) {
        super(options);
        this.count = 0;
    };

    _write(chunk, encoding, cb(err)) {

    }
}
class ClassTransform extends Transform {
    constructor(options={}) {
        options.objectMode = true;
        super(options);
    };

    // _transform(chunk, encoding, callback) {
    //  this.push('[' + chunk.toString() + ']');
    //  callback();
    // }
    _transform(chunk, encoding, done) {
     done(null. JSON.stringify(chunk));
    }
}

const tr = new  ClassTransform()
    .pipe(new ClassWritable )
    .pipe(process.stdout);

const input = new ClassReadable({"highWaterMark": 452});

input.on('data', console.log);
input.on('readable', () => {
    let data;
    while(data = input.read(14)) {
        console.log(data.toString());
    }
});
input.on('error', e => {
 console.log(e, 'err');
});
input.on('end', e => {
    //  у читающего
});
input.on('finish', e => {
   //у записывающего - шифруем
});

input.pause();


//--
const input = fs.createReadStream('input.txt');
const output = fs.createWriteStream('output.txt');

input.on('readable', function(){
    while (data = input.read()) {
        console.log(data.length);
    }
});

output.write('hello');
output.end('world');
output.write('!');
//

//
const input = fs.createReadStream('input.txt');
const output = fs.createWriteStream('output.txt');
input.pipe(output);
input.pipe(process.stdout);