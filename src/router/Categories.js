const express = require('express');
const router = express.Router();
const categoriesController = require('../controller/categoriesController.js');

router.post("/", categoriesController.store);
router.get("/", categoriesController.index);
router.get("/:id", categoriesController.show);
router.put("/:id", categoriesController.update);
router.delete("/:id", categoriesController.delete);

module.exports = router;