const mongoose = require('mongoose');
const Product = require('./productModel');

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
