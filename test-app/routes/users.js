var express = require('express');
var router = express.Router();

var monitor = require('express-monitor');
var monitorInstance = new monitor({name:"Hector", type:"mongo", url:"mongodb://localhost:27017/express-monitor"});
monitorInstance.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
  monitorInstance.insert("Application started", "log",  function(){
    res.send('respond with a resource');
  });

});

module.exports = router;
