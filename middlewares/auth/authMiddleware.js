const expressAsynsHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const User = require("../../model/user/User");

const authMiddleware = expressAsynsHandler(async (req, res, next) => {
  const token = req?.headers?.authorization.replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  try {
    if (token) {
      const user = await User.findById(decoded?.id).select("-password");
      req.user = user;
      next();
    } else {
      throw new Error("There is no token attached to the header");
    }
  } catch (error) {
    throw new Error("No authorized token axpired");
  }
});

module.exports = authMiddleware;
