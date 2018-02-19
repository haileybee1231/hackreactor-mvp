var express = require('express');
var bodyParser = require('body-parser');
var fetcher = require('./helpers.js');
var mongo = require('../database/index.js')


var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.get('/fingering*', function(req, res) {
  let query = req.url.slice(18);

  fetcher.fetchChord(query, (data) => {
    res.status(200).send(data);
  });
})

app.get('/name*', function(req, res) {
  let query = req.url.slice(13);

  fetcher.fetchChord(query, (data) => {
    res.status(200).send(data);
  });
})

app.post('/progression', function(req, res) {
  let progression = req.body;
  let {chords, name, date} = progression;
  let length = progression.chords.length;

  mongo.progression.find({name: name}).exec((err, result) => {
    console.log(result)
    if (err) {
      console.error('Error finding progression: ', err);
    } else if (result.length !== 0) {
      console.log('Name in request is already used.')
      res.status(201).send('That name is already taken, please choose another.')
    } else {
      mongo.save(chords, name, length, date);
      console.log(`Progression ${name} successfully added to database.`)

      res.status(201).send('Progression successfully added to database.');
    }
  })
})

app.get('/progression*', function(req, res) {
  let name = JSON.parse(decodeURIComponent(req.url).slice(13)).name;

  mongo.progression.find({name: name}).exec((err, result) => {
    if (err) {
      console.error(`Error finding ${name} in databse.`)
    } else if (result.length === 0) {
      res.send('Record not found in database.')
    }
    res.status(200).send(JSON.stringify(result));
  })
})

app.delete('/progression', function(req, res) {
  let name = req.body.name;

  mongo.progression.remove({name: name}).exec((err, result) => {
    console.log(result);
    if (err) {
      res.send(err);
    } else if (result.n > 0) {
      res.send(`Progression ${name} successfully deleted from database.`);
    } else {
      res.send(`Progression ${name} not found in database.`)
    }
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
