
exports = module.exports = Monitor;

var dbConnect = require('./db');


function Monitor( options ) {
    options     = options || {};
    this.name   = options.name || 'express-monitor';
    this.id = [ 'express-monitor', require("os").hostname(), process.pid ].join(':');
    this._options   = options;
    this._db = new dbConnect(options);
}


Monitor.prototype.connect = function(  ) {
    this._db.connect();
};


Monitor.prototype.insert = function(log, level, callback) {
    return this._db.insert(log, level, callback);


};

