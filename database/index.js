const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB || 'mongodb://localhost/chordfinder');

const progressionSchema = mongoose.Schema({
  chords: [{
    name: String,
    fingering: String
  }],
  name: String,
  length: Number,
  date: Date
});

const chordSchema = mongoose.Schema({
  name: String,
  fingering: String
});

const userSchema = mongoose.Schema({
  username: String,
  password: String
});

const Progression = mongoose.model('Progression', progressionSchema);
const Chord = mongoose.model('Chord', chordSchema);
const User = mongoose.model('User', userSchema);

const saveProgression = (chords, name, length, date) => {
  let progression = new Progression({chords: chords, name: name, length: length, date: date});

  progression.save(err => {
    if (err) {
      console.error('Dabatase error: ', err);
    } else {
      console.log('Record added to database.')
    }
  })
}

const saveChord = (name, fingering) => {
  let chord = new Chord({name: name, fingering: fingering});

  chord.save(err => {
    if (err) {
      console.error('Database error: ', err);
    } else {
      console.log(`${name} successfully added to chord database.`);
    }
  })
}

const addUser = (username, password, cb) => {
  User.find({username: username}).exec((err, user) => {
    if (!user.length) {
      let user = new User({username: username, password: password});
      user.save(err => {
        if (err) {
          cb(err);
        } else {
          cb(user);
        }
      })
    } else {
      cb('User already exists');
    }
  });
}

module.exports.saveProgression = saveProgression;
module.exports.saveChord = saveChord;
module.exports.addUser = addUser;
module.exports.progression = Progression;
module.exports.chord = Chord;
module.exports.user = User;
