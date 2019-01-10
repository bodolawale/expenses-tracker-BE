/**
 * ExpensesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const _ = require('lodash');

module.exports = {
  async create(req, res) {
    try {
      const data = _.pick(req.body, ['type', 'category', 'amount', 'note', 'date']);
      data.user = req.user.id;
      const expenses = await Expenses.create(data).fetch();
      return res.status(201).json({
        success: true,
        message: 'Expenses added Successfully',
        data: { ...expenses },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Unable to add expenses',
        error: { ...error },
      });
    }
  },

  async read(req, res) {
    try {
      const criteria = { id: req.params.id, user: req.user.id };
      const expenses = await Expenses.findOne(criteria);
      if (!expenses) {
        return res.status(404).json({
          success: false,
          message: 'Expenses not found',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Expenses retrived Successfully',
        data: { ...expenses },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Unable to retrive expenses',
        error: { ...error },
      });
    }
  },

  async update(req, res) {
    try {
      const criteria = { id: req.params.id, user: req.user.id };
      const data = _.pick(req.body, ['type', 'category', 'amount', 'note', 'date']);
      const expenses = await Expenses.update(criteria).set(data).fetch();
      if (!expenses.length) {
        return res.status(404).json({
          success: false,
          message: 'Expenses not found',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Expenses updated Successfully',
        data: { ...expenses[0] },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Unable to update expenses',
        error: { ...error },
      });
    }
  },

  async delete(req, res) {
    try {
      const criteria = { id: req.params.id, user: req.user.id };
      const expenses = await Expenses.destroy(criteria).fetch();
      if (!expenses.length) {
        return res.status(404).json({
          success: false,
          message: 'Expenses not found',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Expenses deleted Successfully',
        data: { ...expenses[0] },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Unable to delete expenses',
        error: { ...error },
      });
    }
  }
};

