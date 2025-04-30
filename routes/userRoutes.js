const express = require("express");
const router = express.Router();
const userController = require("../controller/userController.js");
const authMiddleWare = require("../middleware/authMiddleWare.js");
// require('dotenv').config();
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const userModel = require("./userSchema");

// const secret = process.env.JWT_SECRET;

router.post("/register", userController.postUser);

router.post("/login", userController.getUser);

router.get("/verifyuser", authMiddleWare, userController.verifyUser);

module.exports = router;
