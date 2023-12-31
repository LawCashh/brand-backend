const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');

const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  let productsQuery = Product.find().select('-__v');
  let pagesCount = 1;
  let page = 1;
  let limit = 10;
  let documentsCountQuery = Product.find().select('-__v');
  if (req.query.page != undefined) {
    page = req.query.page;
  }
  if (req.query.brand != undefined) {
    reqQueryBrand = req.query.brand.replace('%', ' ');
    const brandNames = reqQueryBrand.split(',');
    const escapedBrandNames = brandNames.map((name) =>
      name.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
    );
    const regexArray = escapedBrandNames.map(
      (escapedName) => new RegExp(escapedName, 'i'),
    );

    productsQuery = productsQuery.where({
      brand: { $in: regexArray },
    });

    documentsCountQuery = documentsCountQuery.where({
      brand: { $in: regexArray },
    });
  }
  if (req.query.distributer != undefined) {
    reqQueryDistributer = req.query.distributer.replace('%', ' ');
    const distributerNames = reqQueryDistributer.split(',');
    const escapedDistributerNames = distributerNames.map((name) =>
      name.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
    );
    const regexArray = escapedDistributerNames.map(
      (escapedName) => new RegExp(escapedName, 'i'),
    );

    productsQuery = productsQuery.where({
      distributer: { $in: regexArray },
    });

    documentsCountQuery = documentsCountQuery.where({
      distributer: { $in: regexArray },
    });
  }
  if (req.query.search != undefined) {
    reqQuerySearch = req.query.search.replace('%', ' ');
    const escapedSearchString = reqQuerySearch.replace(
      /[-\/\\^$*+?.()|[\]{}]/g,
      '\\$&',
    );
    productsQuery = productsQuery.where({
      title: { $regex: escapedSearchString, $options: 'i' },
    });
    documentsCountQuery = documentsCountQuery.where({
      title: { $regex: escapedSearchString, $options: 'i' },
    });
  }
  documentsCountQuery = documentsCountQuery.countDocuments();
  let documentsCount = await documentsCountQuery.exec();
  if (req.query.limit != undefined) {
    limit = req.query.limit;
    productsQuery = productsQuery.limit(limit);
  }
  pagesCount = Math.floor(documentsCount / limit);
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
    trenutnaStranica: Number.parseInt(page),
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
