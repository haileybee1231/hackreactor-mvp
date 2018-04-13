var express = require('express');
var bodyParser = require('body-parser');
var fetcher = require('./helpers.js');
var mongo = require('../database/index.js');
const passport = require('passport');
const session = require('express-session');
require('./config/passport-config.js')(passport);
var app = express();

app.use(session({
  secret: process.env.SESSION_PASSWORD || 'supersecretsecret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).end('You must log in to do that!');
  }
}

app.get('/fingering*', function(req, res) {
  let query = decodeURIComponent(req.url.slice(18));
  mongo.chord.find({name: query}).exec((err, result) => {
    if (err) {
      console.error(err);
    } else if (result.length) {
      let retrieved = {
        objects: [{name: result[0].name, code: result[0].fingering}]
      }
      res.write(JSON.stringify(retrieved));
      res.status(200).send()
    } else {
      query = query.replace('#', '%23');
      fetcher.fetchChord(query, (data) => {
        let chord = JSON.parse(data).objects[0];
        if (!chord) {
          res.status(404).end();
          return;
        } else {
          mongo.chord.find({ name: chord.name }).exec((err, result) => {
            if (err) {
              console.error(err);
            } else if (!result.length) {
              mongo.saveChord(chord.name, chord.code);
            }
            res.status(200).send(data);
          });
        } 
      });
    }
  });
})

app.get('/name*', function(req, res) {
  let query = req.url.slice(13);
  mongo.chord.find({fingering: decodeURIComponent(query)}).exec((err, result) => {
    if (err) {
      console.error(err);
    } else if (result.length) {
      let retrieved = {
        objects: [{name: result[0].name, code: result[0].fingering}]
      }
      res.status(200).send(JSON.stringify(retrieved));
    } else {
      fetcher.fetchChord(query, (data) => {
        let chord = JSON.parse(data).objects[0];
        chord && mongo.saveChord(chord.name, chord.code);
        res.status(200).send(data);
      });
    }
  });
})

app.post('/progression', isLoggedIn, function(req, res) {
  let progression = req.body;
  let {chords, name, date} = progression;
  let length = progression.chords.length;
  
  mongo.progression.find({name: name}).exec((err, result) => {
    let userFound = false;
    result.forEach(record => {
      if (record.user === req.user[0].username) {
        userFound = true;
      }
    });
    if (err) {
      console.error('Error finding progression: ', err);
    } else if (result.length !== 0 && userFound) {
      console.log('Name in request is already used.')
      res.status(201).send('That name is already taken.')
    } else {
      mongo.saveProgression(chords, name, length, date, req.user[0].username);
      console.log(`Progression ${name} successfully added to database.`)
      
      res.status(201).send('Progression saved.');
    }
  })
})

app.get('/progression*', isLoggedIn, function(req, res) {
  let name = JSON.parse(decodeURIComponent(req.url).slice(13)).name;
  
  mongo.progression.find({name: name, user: req.user[0].username}).exec((err, result) => {
    if (err) {
      console.error(`Error finding ${name} in databse.`);
    } else if (!result.length) {
      res.status(404).end();
    } else {
      res.status(200).send(result[0]);
    }
  })
})

app.delete('/progression', isLoggedIn, function(req, res) {
  let name = req.body.name;
  
  mongo.progression.remove({name: name, user: req.user[0].username}).exec((err, result) => {
    if (err) {
      res.send(err);
    } else if (result.n > 0) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  })
})

app.get('/persist', (req, res) => {
  res.send(req.user);
})

app.post('/login', passport.authenticate('local-login'), (req, res) => {
  res.status(201).json(req.user);
});

app.post('/signup', passport.authenticate('local-signup'), (req, res) => {
  res.status(201).json(req.user);
});

app.post('/logout', isLoggedIn,  (req, res) => {
  res.clearCookie('connect.sid').status(200).redirect('/');
  req.logout();
});

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});
