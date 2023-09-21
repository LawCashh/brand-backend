const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const categoriesRouter = require('./routes/categoriesRoute');
const productsRouter = require('./routes/productsRoute');
const utilityRouter = require('./routes/utilitiesRoute');

const app = express();

app.use(cors());
app.use(bodyparser.json());

app.use('/categories', categoriesRouter);
app.use('/products/', productsRouter);
app.use('/utilities', utilityRouter);

app.use((err, req, res, next) => {
  res.status(401).json({ message: err.message });
});

module.exports = app;
