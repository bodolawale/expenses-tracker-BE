/**
 * Category.js
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
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    chatColor: {
      type: 'string',
      required: true,
      // regex: /^#(?:[0-9a-fA-F]{3}){1,2}$/
    },
    expenses: {
      collection: 'expenses',
      via: 'category'
    },
  },

};

