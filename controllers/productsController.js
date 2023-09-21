const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');

const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  let productsQuery = Product.find().select('-__v');
  if (req.query.limit != undefined)
    productsQuery = productsQuery.limit(req.query.limit);
  const products = await productsQuery.exec();
  if (!products)
    return res
      .status(400)
      .json({ status: 'not ok', message: 'greska u uzimanju producta' });
  res
    .status(200)
    .json({ status: 'ok', message: 'uzeti producti', data: products });
});

exports.getProductInfo = catchAsync(async (req, res, next) => {
  const product = await Product.find({
    _id: req.params.id,
  }).select('-__v');
  if (!product || product.length == 0)
    return res.status(400).json({
      status: 'not ok',
      message: 'greska u uzimanju detalja producta',
    });
  res.status(200).json({
    status: 'ok',
    message: 'uzeti detalji producta',
    data: product[0],
  });
});
