//express_demo.js 文件
var express = require('express');
var app = express();
 
app.get('/', function (req, res) {
   res.send('Hello World');
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  //console.log(server.address())
  var port = server.address().port
 
  console.log("visit http://%s:%s", host, port)
  console.log("visit http://%s:%s", "localhost", port)
 
})
