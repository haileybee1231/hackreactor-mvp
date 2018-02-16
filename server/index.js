var express = require('express');
var bodyParser = require('body-parser');
var fetcher = require('./helpers.js');

var items = require('../database-mysql');


var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.get('/name*', function(req, res) {
  let query = req.url.slice(13);

  fetcher.fetchChord(query, (data) => {
    res.status(200).end(data);
  });

})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
