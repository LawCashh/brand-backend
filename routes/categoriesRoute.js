const express = require('express');
const categoriesController = require('../controllers/categoriesController');

const categoriesRouter = express.Router();

categoriesRouter.get('/', categoriesController.getAllCategories);
categoriesRouter.get(
  '/parent-categories',
  categoriesController.getParentCategories,
);
categoriesRouter.get(
  '/three-discounted',
  categoriesController.getThreeDiscountedCategories,
);
categoriesRouter.get(
  '/:id/subcategories',
  categoriesController.getAllSubCategories,
);
categoriesRouter.get('/:id/products', categoriesController.getCategoryProducts);
categoriesRouter.get('/:id', categoriesController.getCategoryInfo);

module.exports = categoriesRouter;
