const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  fetchUserCtrl,
  deleteUserCtrl,
  fetchDetailUserCtrl,
} = require("../../controllers/users/userCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const userRouters = express.Router();

userRouters.post("/register", userRegisterCtrl);
userRouters.post("/login", userLoginCtrl);
userRouters.get("/", authMiddleware, fetchUserCtrl);
userRouters.get("/:id", authMiddleware, fetchDetailUserCtrl);
userRouters.delete("/:id", authMiddleware, deleteUserCtrl);
module.exports = userRouters;
