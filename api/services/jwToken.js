/**
 * Service to generate JWT
 */
const jwt = require('jsonwebtoken');

module.exports = {
  'sign': function(payload, exp) {
    return jwt.sign({
      data: payload
    }, sails.config.jwt.secret, {expiresIn: exp});
  },
  'verify': function(token, callback) {
    jwt.verify(token, sails.config.jwt.secret, callback);
  }
};
