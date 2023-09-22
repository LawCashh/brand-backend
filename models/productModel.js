const mongoose = require('mongoose');
const Category = require('./categoryModel');

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imagePath: {
    type: String,
  },
  numAvailable: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
    required: true,
    enum: [
      'A.S.C - HEMIK',
      'Agro - Trend STR',
      'Agromarket',
      'Actiwa',
      'AI. I. SR',
      'Brend 1',
      'Brend 2',
      'Brend 3',
      'Brend 4',
    ],
  },
  distributer: {
    type: String,
    required: true,
    enum: [
      'Metalac',
      'Andjelic plast D.O.O',
      'Plastic D.O.O',
      'Modern Trade',
      'TDC',
      'Distributer 1',
      'Distributer 2',
      'Distributer 3',
    ],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  discount: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
