const express = require('express');
const router = express.Router();
const postsController = require("../controller/postsController.js");


router.post("/", postsController.store);
router.get("/", postsController.index);
router.get("/get-by-slug/:slug", postsController.slug);
router.get("/:id", postsController.show);

module.exports = router;