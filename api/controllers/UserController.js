/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const _ = require('lodash');
const passport = require('passport');

module.exports = {
  async create(req, res) {
    try {
      const data = req.body;
      if (data.password !== data.conPassword) {
        return res.send({
          success: false,
          message: 'Passwords don\'t match',
        });
      }
      if (data.password.length < 6) {
        return res.send({
          success: false,
          message: 'Password should be at least 6 characters long',
        });
      }
      const findUser = await User.findOne({ email: data.email });
      if (findUser) {
        return res.send({
          success: false,
          message: 'User already exists',
        });
      }
      const userData = _.pick(data, ['firstName', 'lastName', 'email', 'password']);
      const user = await User.create(userData).fetch();
      return res.send({
        success: true,
        message: 'User created Successfully',
        data: { ...user },
      });
    } catch (error) {
      return res.send({
        success: false,
        error: { ...error },
      });
    }
  },

  async login(req, res) {
    try {
      passport.authenticate('local', async (err, user, info) => {
        if ((err) || (!user)) {
          return res.send({
            message: info.message,
          });
        }
        const exp = req.body.remember === true ? sails.config.jwt.rememberExpiry : sails.config.jwt.expiry;
        const token = jwToken.sign(user, exp);
        req.session.authenticated = true;
        req.session.userId = user.id;
        return res.send(
          {
            session: { ...req.session },
            success: true,
            message: 'Log in successful',
            data: { ...user },
            token
          },
        );
      })(req, res);
    } catch (error) {
      return res.send({
        success: false,
        error: { ...error },
      });
    }
  },
  async logout(req, res){
    try {
      return res.status(200).json({message: 'Log out successful'});
    } catch (error) {
      return res.send({
        success: false,
        error: { ...error },
      });
    }
  }
};
