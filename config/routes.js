/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  /*
   * Users routes
   */
  'POST /user/register': {
    controller: 'UserController',
    action: 'create',
  },
  'POST /user/login': {
    controller: 'UserController',
    action: 'login',
  },
  'GET /user/logout': {
    controller: 'UserController',
    action: 'logout',
  },
  'GET /user/fetch': {
    controller: 'UserController',
    action: 'read',
  },
  'PATCH /user/update': {
    controller: 'UserController',
    action: 'update',
  },
  'PATCH /user/update-password': {
    controller: 'UserController',
    action: 'updatePassword',
  },
  'GET /user/delete': {
    controller: 'UserController',
    action: 'delete',
  },

  /*
   * Expenses routes
   */
  'POST /expenses/add': {
    controller: 'ExpensesController',
    action: 'create',
  },
  'GET /expenses/fetch/:id': {
    controller: 'ExpensesController',
    action: 'read',
  },
  'PATCH /expenses/update/:id': {
    controller: 'ExpensesController',
    action: 'update',
  },
  'GET /expenses/delete/:id': {
    controller: 'ExpensesController',
    action: 'delete',
  },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
