const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  fetchUserCtrl,
  deleteUserCtrl,
  fetchDetailUserCtrl,
} = require("../../controllers/users/userCtrl");

const userRouters = express.Router();

userRouters.post("/register", userRegisterCtrl);
userRouters.post("/login", userLoginCtrl);
userRouters.get("/", fetchUserCtrl);
userRouters.get("/:id", fetchDetailUserCtrl);
userRouters.delete("/:id", deleteUserCtrl);
module.exports = userRouters;
