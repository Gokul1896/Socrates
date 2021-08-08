/**the routes for the APIs are defined here */

const express = require("express"),
userController = require("../app/controller/userController"),
router = express.Router();
router.post("/api/create/user", userController.register);
router.post("/api/login/user", userController.userLogin);
module.exports = router;
