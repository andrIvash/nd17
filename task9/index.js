const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const config = require('./config/');

var uri = `mongodb://${config().get('user')}:${config().get('password')}@ds021182.mlab.com:21182/my-test`;

MongoClient.connect(uri, function(err, db) {
    if(err) throw new Error('connection to database is broken', err);

    console.log('connection to database was performed');
    const collection = db.collection('users');

    let user1 = {name: 'John'};
    let user2 = {name: 'David'};
    let user3 = {name: 'Steve'};

    collection.insert([user1, user2, user3], (err, result) => {
        if (err)  throw new Error('can not insert', err);
        showData(collection,{});
        collection.update({name: 'Steve'}, {$set: {name: 'Superman'}});
        showData(collection,{});
        collection.remove({name : 'Superman'});
        showData(collection,{});
        collection.remove();
        db.close();
    });
});

function showData(collection, query) {
    collection.find(query).toArray((err, result) => {
        if (err) throw new Error('not found', err);
        console.log(result);
    });
}