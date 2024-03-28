const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController.js');
const auth = require("../middleware/auth.js");
const isSuperAdmin =  require("../middleware/superAdmin.js");

router.post("/", [auth(), isSuperAdmin()], usersController.store);
router.get("/", [auth(), isSuperAdmin()], usersController.index);
router.get("/:id", [auth()], usersController.show);
router.put("/:id", [auth(), isSuperAdmin()], usersController.update);
router.delete("/:id", [auth(), isSuperAdmin()], usersController.delete);


module.exports = router;