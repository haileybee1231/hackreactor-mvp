const bodyParser = require('body-parser');
const request = require('request');
const config = require('../config.js');

const fetchChord = (nameOrFingering, callback) => {
  let destination = `http://api.guitarparty.com/v2/chords/?query=${nameOrFingering}`;
  let options = {
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Guitarparty-Api-Key': config.APIKEY
    },
    url: destination
  }

  request(options, (err, response, body) => {
    if (err) {
      console.error(err);
    }
    callback(body);
  })
}

module.exports.fetchChord = fetchChord;
