var server = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");

var db = mongo.connect("mongodb://localhost/blogDb", function (err, response) {
  if(err){
    console.log(err);
  } else {
    console.log('Connected to ' + db, ' + ', response);
  }
});

var app = server();
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});
