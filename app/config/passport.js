import {Strategy as LocalStrategy} from 'passport-local';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// user Object
let model = {};


// Load User model
const User = mongoose.model('User');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'id', passwordField:'pin' }, (id, pin, done) => {
      // Match user
      User.findOne({
        id: id
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(pin, user.pin, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            model = user;
            return done(null, model);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};