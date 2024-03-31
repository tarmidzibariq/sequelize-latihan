const express = require('express');
const router = express.Router();
const postsController = require("../controller/postsController.js");


router.post("/", postsController.store);
router.get("/", postsController.index);

module.exports = router;