const express = require('express');
const utilitiesController = require('../controllers/utilitiesController');

const utilitiesRouter = express.Router();

utilitiesRouter.get('/', utilitiesController.getAllUtilities);
utilitiesRouter.get('/:id', utilitiesController.getUtilityInfo);

module.exports = utilitiesRouter;
