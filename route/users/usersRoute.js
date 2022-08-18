const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  fetchUserCtrl,
  deleteUserCtrl,
  fetchDetailUserCtrl,
  profileUserCtrl,
  updateProfileUserCtrl,
  updateUserPasswordCtrl,
  generateVerificationTokenCtrl,
} = require("../../controllers/users/userCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const userRouters = express.Router();

userRouters.post("/register", userRegisterCtrl);
userRouters.post("/login", userLoginCtrl);
userRouters.get("/", authMiddleware, fetchUserCtrl);
userRouters.get("/:id", authMiddleware, fetchDetailUserCtrl);
userRouters.get("/profile/:id", authMiddleware, profileUserCtrl);
userRouters.put("/:id", authMiddleware, updateProfileUserCtrl);
userRouters.post("/send-mail", generateVerificationTokenCtrl);
userRouters.put("/password/:id", authMiddleware, updateUserPasswordCtrl);
userRouters.delete("/:id", authMiddleware, deleteUserCtrl);
module.exports = userRouters;
