var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 5000, function() {
  console.log('Node app is running');
});
