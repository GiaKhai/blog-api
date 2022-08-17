const expressAsynsHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const User = require("../../model/user/User");

const authMiddleware = expressAsynsHandler(async (req, res, next) => {
  const token = req?.headers?.authorization.replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  try {
    if (token) {
      const user = await User.findById(decoded?.id);
      req.user = user;
      next();
    } else {
      throw new Error("Header k có token");
    }
  } catch (error) {
    throw new Error("No auth");
  }
});

module.exports = authMiddleware;
