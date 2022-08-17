const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
} = require("../../controllers/users/userCtrl");

const userRouters = express.Router();

userRouters.post("/register", userRegisterCtrl);
userRouters.post("/login", userLoginCtrl);

module.exports = userRouters;
