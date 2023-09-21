const mongoose = require('mongoose');

const utilitySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
  },
  iconPath: {
    type: String,
  },
});

const Utility = mongoose.model('Utility', utilitySchema);
module.exports = Utility;
