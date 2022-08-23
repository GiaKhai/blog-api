const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/Post");
const validateMongodbId = require("../utils/validateMongodbID");

const createPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//fetch all post
const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const post = await Post.find({});
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

module.exports = { createPostCtrl, fetchPostCtrl };
