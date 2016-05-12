exports = module.exports= dbConnect;

function dbConnect( options ) {
    options     = options || {};
    this.name   = options.name || 'express-monitor';
    this.id = [ 'express-monitor', require("os").hostname(), process.pid ].join(':');
    this._options   = options;
    this._dbClient = this.createClient();
}


dbConnect.prototype.createClient = function(){

    if(this._options.type == "mongo"){
         this._client = require('./database-adapters/mongo');
        console.warn("mongo detected");
    }
    return this._client.createClient();
};


dbConnect.prototype.connect = function(){
    this._dbConnection = this._client.connect(this, this._options);
    
};

dbConnect.prototype.insert = function(log,level,callback){

    var document = {
        name: this.name,
        process: this.id,
        log: log,
        level: level,
        timestamp: new Date()
    };
    this._client.insert(this._dbConnection, document, callback);
};