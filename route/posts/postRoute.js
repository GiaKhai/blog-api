const express = require("express");
const {
  createPostCtrl,
  fetchPostCtrl,
} = require("../../controllers/posts/postCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const postRouter = express.Router();

postRouter.post("/", authMiddleware, createPostCtrl);
postRouter.get("/", authMiddleware, fetchPostCtrl);

module.exports = postRouter;
