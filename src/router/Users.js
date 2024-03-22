const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController.js');

router.post("/", usersController.store);
router.get("/:id", usersController.show);
router.put("/:id", usersController.update);


module.exports = router;