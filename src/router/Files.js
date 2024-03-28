const express = require('express');
const router = express.Router();
const filesController = require('../controller/filesController.js');
const auth = require("../middleware/auth.js");
const isSuperAdmin =  require("../middleware/superAdmin.js");
const isCreator =  require("../middleware/creator.js");

router.post("/",[auth()], filesController.store);
module.exports = router;