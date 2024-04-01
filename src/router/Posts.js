const express = require('express');
const router = express.Router();
const postsController = require("../controller/postsController.js");
const auth = require("../middleware/auth.js");


router.post("/",[auth()], postsController.store);
router.get("/", postsController.index);
router.get("/get-by-slug/:slug", postsController.slug);
router.get("/:id", postsController.show);
router.put("/:id",[auth()], postsController.update);
router.delete("/:id",[auth()], postsController.destroy);

module.exports = router;