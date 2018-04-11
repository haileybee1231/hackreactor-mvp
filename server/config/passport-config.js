const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
const saltRounds = 10;
let mongo = require('../../database/index.js');
let bodyParser = require('body-parser');

module.exports = function (passport) {
  passport.serializeUser(function (user, done) { // creating sessions
    done(null, user);
  });

  passport.deserializeUser(async (user, done) => {
    done(null, user);
  });

  // LOCAL LOGIN STRATEGY
  passport.use('local-login', new LocalStrategy({
    passReqToCallback: true
  },
    (req, username, password, cb) => {
      mongo.user.find({username: username}).exec((err, userInfo) => {
        if (userInfo.length) {
          bcrypt.compare(password, userInfo[0].password, (err, res) => {
            if (err) {
              cb(err, null);
            } else if (res === false) {
              cb(null, false);
            } else {
              cb(null, userInfo);
            }
          })
        } else {
          cb(null, false);
        }
      });
    }
  )
);

  //LOCAL SIGNUP Strategy
  passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true,
  },
    async (req, username, password, cb) => {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          cb(err, null)
        } else {
          let user = mongo.addUser(username, hash, user => {
            if (user === 'User already exists') {
              cb(user, null);
            } else {
              cb(null, 'User successfully created')
            }
          });
        }
      })
    }
  ));
}
