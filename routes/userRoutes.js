const express = require("express");
const router = express.Router();
const userController = require("../controller/userController.js");
const authMiddleWare = require("../middleware/authMiddleWare.js");

router.post("/register", userController.postUser);

router.post("/login", userController.getUser);

router.get("/verifyuser", authMiddleWare, userController.verifyUser);

module.exports = router;
