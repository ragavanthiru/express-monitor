

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


exports.createClient = function(){
    return MongoClient;
};

exports.connect = function(factory, options){
    MongoClient.connect(options.url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        console.warn(db);
        factory._dbConnection = db;
        return db;//db.close();
    });
};

exports.insert = function(db, document, callback){
        // Get the documents collection
        var collection = db.collection('logs');
        // Insert some documents
        collection.insertOne(document, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted document "+document);
            callback(result);
        });
};


