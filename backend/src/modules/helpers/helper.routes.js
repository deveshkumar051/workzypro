const express = require('express');
const router = express.Router();
const { searchHelpers, getHelperProfile } = require('./helper.controller');

router.get('/', searchHelpers);
router.get('/:id', getHelperProfile);

module.exports = router;
