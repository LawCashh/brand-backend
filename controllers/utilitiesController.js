const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');
const Utility = require('../models/utilityModel');

exports.getAllUtilities = catchAsync(async (req, res, next) => {
  const utilities = await Utility.find().select('-__v');
  if (!utilities)
    return res
      .status(400)
      .json({ status: 'not ok', message: 'greska u uzimanju utilitija' });
  res
    .status(200)
    .json({ status: 'ok', message: 'uzeti utilities', data: utilities });
});

exports.getUtilityInfo = catchAsync(async (req, res, next) => {
  const utility = await Utility.find({
    _id: req.params.id,
  }).select('-__v');
  if (!utility || utility.length == 0)
    return res.status(400).json({
      status: 'not ok',
      message: 'greska u uzimanju detalja utility-ja',
    });
  res.status(200).json({
    status: 'ok',
    message: 'uzeti detalji utility-ja',
    data: utility[0],
  });
});
