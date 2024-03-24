const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController.js');

router.post("/", usersController.store);
router.get("/", usersController.index);
router.get("/:id", usersController.show);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.delete);


module.exports = router;