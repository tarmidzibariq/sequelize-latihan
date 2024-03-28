const express = require('express');
const router = express.Router();
const categoriesController = require('../controller/categoriesController.js');
const auth = require("../middleware/auth.js");

router.post("/", [auth()], categoriesController.store);
router.get("/", categoriesController.index);
router.get("/:id", categoriesController.show);
router.put("/:id", [auth()] , categoriesController.update);
router.delete("/:id", [auth()], categoriesController.delete);

module.exports = router;