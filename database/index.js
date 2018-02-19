const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB || 'mongodb://localhost/chordfinder');

let progressionSchema = mongoose.Schema({
  chords: [{
    name: String,
    fingering: String
  }],
  name: String,
  length: Number,
  date: Date
});

let Progression = mongoose.model('Progression', progressionSchema);

let save = (chords, name, length, date) => {
  let progression = new Progression({chords: chords, name: name, length: length, date: date});

  progression.save(err => {
    if (err) {
      console.error('Dabatase error: ', err);
    } else {
      console.log('Record added to database.')
    }
  })
}

module.exports.save = save;
module.exports.progression = Progression;
