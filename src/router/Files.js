const express = require('express');
const router = express.Router();
const filesController = require('../controller/filesController.js');

router.post("/", filesController.store);

module.exports = router;