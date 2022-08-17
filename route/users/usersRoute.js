const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  fetchUserCtrl,
  deleteUserCtrl,
} = require("../../controllers/users/userCtrl");

const userRouters = express.Router();

userRouters.post("/register", userRegisterCtrl);
userRouters.post("/login", userLoginCtrl);
userRouters.get("/", fetchUserCtrl);
userRouters.delete("/:userId", deleteUserCtrl);

module.exports = userRouters;
