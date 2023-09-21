const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// if (process.env.NODE_ENV == 'development') {
//   dotenv.config({ path: './config.env' });
// } else if (process.env.NODE_ENV == 'production') {
//   dotenv.config({ path: './config-production.env' });
// }

dotenv.config({ path: './config.env' });

const app = require('./app');

const uri = process.env.DATABASE_URL.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

const Category = require('./models/categoryModel');
const Product = require('./models/productModel');
const Utility = require('./models/utilityModel');

const db = mongoose
  .connect(uri)
  .then(() => {
    console.log('povezan na bazu');
  })
  .catch((err) => {
    console.log('greska povezivanja na bazu' + err);
  });

app.listen(process.env.PORT || 3000, () => {
  console.log('Slusam na port 3000');
});
