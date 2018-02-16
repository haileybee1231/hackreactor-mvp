var express = require('express');
var bodyParser = require('body-parser');
var fetcher = require('./helpers.js');

var items = require('../database-mysql');


var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.get('/name*', function(req, res) {
  let target = req.url.slice(13);
  console.log(target);

  fetcher.fetchChord(target);

  res.status(200).end();
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
