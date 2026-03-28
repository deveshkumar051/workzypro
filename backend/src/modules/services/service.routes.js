const express = require('express');
const router = express.Router();
const { getAllServices, getServiceById, getHelpersByService } = require('./service.controller');

router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.get('/:id/helpers', getHelpersByService);

module.exports = router;
