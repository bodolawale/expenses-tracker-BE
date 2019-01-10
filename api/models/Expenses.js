/**
 * Expenses.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user: {
      model: 'user',
      required: true
    },
    type: {
      type: 'string',
      isIn: ['expenses', 'income'],
      required: true
    },
    date: {
      type: 'string',
      columnType: 'datetime',
      required: true
    },
    // category: {
    //   model: 'category',
    // },
    amount: {
      type: 'number',
      required: true
    },
    note: {
      type: 'string',
    }
  },
  datastore: 'mongodb'
};

