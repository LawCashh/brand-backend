const express = require('express');
const cors = require('cors');

const categoriesRouter = require('./routes/categoriesRoute');
const productsRouter = require('./routes/productsRoute');

const app = express();

app.use(cors());

app.use('/categories', categoriesRouter);
app.use('/products/', productsRouter);

app.use((err, req, res, next) => {
  res.status(401).json({ message: err.message });
});

module.exports = app;
