/**
 * CategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res) {
    try {
      const data = _.pick(req.body, ['type', 'name', 'chatColor', 'expenses']);
      data.user = req.user.id;
      const category = await Category.create(data).fetch();
      return res.status(201).json({
        success: true,
        message: 'Category added Successfully',
        data: { ...category },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Unable to add category',
        error: { ...error },
      });
    }
  },

  async read(req, res) {
    try {
      const criteria = { id: req.params.id, user: req.user.id };
      const category = await Category.findOne(criteria).populate('expenses');
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Category retrived Successfully',
        data: { ...category },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Unable to retrive category',
        error: { ...error },
      });
    }
  },

  async update(req, res) {
    try {
      const criteria = { id: req.params.id, user: req.user.id };
      const data = _.pick(req.body, ['type', 'name', 'chatColor', 'expenses']);
      const category = await Category.update(criteria).set(data).fetch();
      if (!category.length) {
        return res.status(404).json({
          success: false,
          message: 'Category not found',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Category updated Successfully',
        data: { ...category[0] },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Unable to update category',
        error: { ...error },
      });
    }
  },

  async delete(req, res) {
    try {
      const criteria = { id: req.params.id, user: req.user.id };
      const category = await Category.destroy(criteria).fetch();
      if (!category.length) {
        return res.status(404).json({
          success: false,
          message: 'Category not found',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Category deleted Successfully',
        data: { ...category[0] },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Unable to delete category',
        error: { ...error },
      });
    }
  }

};

