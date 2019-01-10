/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const _ = require('lodash');
const passport = require('passport');
const bcrypt = require('bcryptjs');

module.exports = {
  async create(req, res) {
    try {
      const data = req.body;
      if (data.password !== data.conPassword) {
        return res.status(400).json({
          success: false,
          message: 'Passwords don\'t match',
        });
      }
      if (data.password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password should be at least 6 characters long',
        });
      }
      const findUser = await User.findOne({ email: data.email });
      if (findUser) {
        return res.status(400).json({
          success: false,
          message: 'User already exists',
        });
      }
      const userData = _.pick(data, ['firstName', 'lastName', 'email', 'password']);
      const user = await User.create(userData).fetch();
      return res.status(201).json({
        success: true,
        message: 'User created Successfully',
        data: { ...user },
      });
    } catch (error) {
      return res.status(400).json({
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
        return res.status(200).json(
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
      return res.status(400).json({
        success: false,
        error: { ...error },
      });
    }
  },

  async logout(req, res){
    try {
      return res.status(200).json({
        message: 'Log out successful'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: { ...error },
      });
    }
  },

  async read(req, res){
    try {
      const user = await User.findOne({id: req.user.id});
      if(!user) {
        return res.status(404).json({
          message: 'User not found'
        });
      }
      return res.status(200).json({
        message: 'User retrived successfully',
        data: {...user}
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: {...error},
      });
    }
  },

  async update(req, res){
    try {
      const data = _.pick(req.body, ['firstName', 'lastName']);
      const user = await User.update({id: req.user.id}).set(data).fetch();
      if(!user.length) {
        return res.status(404).json({
          message: 'User not found'
        });
      }
      return res.status(200).json({
        message: 'User updated successfully',
        data: {...user[0]}
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: {...error},
      });
    }
  },

  async delete(req, res){
    try {
      const user = await User.destroy({id: req.user.id}).fetch();
      if(!user.length) {
        return res.status(404).json({
          message: 'User not found'
        });
      }
      return res.status(200).json({
        message: 'User deleted successfully',
        data: {...user[0]}
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: {...error},
      });
    }
  },

  async updatePassword(req, res) {
    try {
      const data = _.pick(req.body, ['oldPassword', 'newPassword']);
      if ((!data.newPassword) || (!data.oldPassword)) {
        return res.status(400).json({
          message: 'Please provdie both old and new password',
        });
      }
      const user = await User.findOne({id: req.user.id});
      if(!user) {
        return res.status(404).json({
          message: 'User not found'
        });
      }
      const match = await bcrypt.compare(data.oldPassword, user.password);
      if(!match){
        return res.status(400).json({
          message: 'Old password is incorrect'
        });
      }
      if (data.oldPassword === data.newPassword) {
        return res.status(400).json({
          success: false,
          message: 'Password reset with old password is not allowed'
        });
      }
      const updatedUser = await User.update({id: req.user.id}).set({password: data.newPassword}).fetch();
      return res.status(200).json({
        message: 'Password updated successfully',
        data: {...updatedUser[0]}
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        err: error,
        error: {...error},
      });
    }
  }

};
