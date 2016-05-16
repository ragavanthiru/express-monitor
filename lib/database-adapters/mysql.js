/**
 * MySQL adapter. Handles MySQL-specific requests
 * @author ramdesh
 */

var mysqlClient = require('mysql');
var assert = require('assert');

exports.createClient = function(){
    return mysqlClient;
};

exports.connect = function(factory, options){
    var connection = mysqlClient.createConnection({
        host: options.host,
        user: options.user,
        password: options.password,
        database: options.database

    });
    connection.connect(function(err) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
    });
    connection.query('CREATE TABLE IF NOT EXISTS logs (' +
        'id INT(11) NOT NULL AUTO_INCREMENT,' +
        'name VARCHAR(45) DEFAULT NULL,' +
        'process VARCHAR(20) DEFAULT NULL,' +
        'log TEXT DEFAULT NULL,' +
        'level VARCHAR(50) DEFAULT NULL,' +
        'PRIMARY KEY (id) )',
        function(err, result) {
            assert(null, err);
            console.log("Created log table");
        }
    );
    factory._dbConnection = connection;
    return connection;
};

exports.insert = function(db, document, callback){
    // Insert the log data
    db.query('INSERT INTO logs SET ?', document, function(err, result) {
       assert.equal(err, null);
        console.log("Inserted document " + document);
        callback(result);
    });
};
