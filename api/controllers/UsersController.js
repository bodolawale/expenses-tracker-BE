/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create (req, res) {
    try {
      const data = req.body;
      const user = await Users.create(data).fetch();
      return res.send({
        message: 'User created Successfully',
        data: {...user}
      });
    } catch (error) {
      return res.send(error);
    }
  }
};

