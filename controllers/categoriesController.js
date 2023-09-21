const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');

const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  if (categories.length == 0)
    return res
      .status(400)
      .json({ status: 'not ok', message: 'nema kategorija' });
  res
    .status(200)
    .json({ status: 'ok', message: 'uzete sve kategorije', data: categories });
});

exports.getParentCategories = catchAsync(async (req, res, next) => {
  const parentCategories = await Category.find({ parent: null }).select('-__v');
  if (!parentCategories)
    return res.status(400).json({
      status: 'not ok',
      message: 'greska u uzimanju parent kategorija',
    });
  res.status(200).json({
    status: 'ok',
    message: 'uzete sve glavne kategorije',
    data: parentCategories,
  });
});

exports.getThreeDiscountedCategories = catchAsync(async (req, res, next) => {
  const randomCategories = await Category.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'category',
        as: 'products',
      },
    },
    {
      $match: {
        'products.discount': { $gte: 20 },
      },
    },
    {
      $sample: { size: 3 },
    },
    {
      $project: {
        products: 0,
      },
    },
  ]);
  if (!randomCategories)
    return res.status(400).json({
      status: 'not ok',
      message: 'greska u uzimanju subkategorija na akciji',
    });
  res
    .status(200)
    .json({ status: 'ok', message: 'uzete', data: randomCategories });
});

exports.getAllSubCategories = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const parentCategory = await Category.find({ _id: req.params.id }).select(
    '-__v',
  );
  const subCategories = await Category.find({
    parent: new mongoose.Types.ObjectId(req.params.id),
  }).select('-__v');
  if (!subCategories)
    return res
      .status(400)
      .json({ status: 'not ok', message: 'greska u uzimanju subkategorija' });
  res.status(200).json({
    status: 'ok',
    message: 'uzete sve subkategorije',
    parent: parentCategory[0],
    subCategories: subCategories,
  });
});

exports.getCategoryInfo = catchAsync(async (req, res, next) => {
  const category = await Category.find({
    _id: req.params.id,
  }).select('-__v');
  if (!category || category.length == 0)
    return res.status(400).json({
      status: 'not ok',
      message: 'greska u uzimanju detalja kategorije',
    });
  res.status(200).json({
    status: 'ok',
    message: 'uzeti detalji kategorije',
    data: category[0],
  });
});

exports.getCategoryProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({
    category: new mongoose.Types.ObjectId(req.params.id),
  });
  if (!products)
    return res.status(400).json({
      status: 'not ok',
      message: 'greska u uzimanju producata kategorije',
    });
  res.status(200).json({
    status: 'ok',
    message: 'uzeti producti kategorije',
    data: products,
  });
});
