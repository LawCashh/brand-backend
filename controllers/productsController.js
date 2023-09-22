const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');

const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  let productsQuery = Product.find().select('-__v');
  let pagesCount = 0;
  let documentsCount = await Product.countDocuments();
  let page = 1;
  let limit = 10;
  if (req.query.limit != undefined) {
    limit = req.query.limit;
    productsQuery = productsQuery.limit(limit);
    pagesCount = documentsCount / limit;
  }
  if (req.query.page != undefined) {
    page = req.query.page;
  }
  if (documentsCount % limit != 0) pagesCount++;
  productsQuery = productsQuery.skip((page - 1) * limit);
  const products = await productsQuery.exec();
  if (!products)
    return res
      .status(400)
      .json({ status: 'not ok', message: 'greska u uzimanju producta' });
  res.status(200).json({
    status: 'ok',
    message: 'uzeti producti',
    brojStranica: pagesCount,
    data: products,
  });
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
