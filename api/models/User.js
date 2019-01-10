/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcryptjs');

module.exports = {

  attributes: {
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },
    email : {
      type: 'string',
      isEmail: true,
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6
    },
  },
  customToJSON() {
    // Return a shallow copy of this record with the password and ssn removed.
    return _.omit(this, ['password', 'ssn']);
  },
  beforeUpdate: function (user, cb) {
    if (user.password) {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return cb(err);
        } else {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
              return cb(err);
            } else {
              user.password = hash;
              return cb(null,user);
            }
          });
        }
      });
    } else {
      return cb();
    }
  },
  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return cb(err);
      } else {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) {
            return cb(err);
          } else {
            user.password = hash;
            return cb(null,user);
          }
        });
      }
    });
  },
  datastore: 'mongodb'
};

