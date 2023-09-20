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

// const Category = require('./models/categoryModel');
const Product = require('./models/productModel');

const randomBrand = [
  'A.S.C - HEMIK',
  'Agro - Trend STR',
  'Agromarket',
  'Actiwa',
  'AI. I. SR',
  'Brend 1',
  'Brend 2',
  'Brend 3',
  'Brend 4',
];
const randomDistributer = [
  'Metalac',
  'Andjelic plast D.O.O',
  'Plastic D.O.O',
  'Modern Trade',
  'TDC',
  'Distributer 1',
  'Distributer 2',
  'Distributer 3',
];

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

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
