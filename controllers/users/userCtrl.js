const User = require("../../model/user/User");
const expressAsynsHandler = require("express-async-handler");

//register
const userRegisterCtrl = expressAsynsHandler(async (req, res) => {
  //check email
  const userExists = await User.findOne({ email: req?.body?.email });
  if (userExists) {
    throw new Error("Mail đã tồn tại");
  }

  try {
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }

  res.json({ user: "User Register" });
});

//login

const userLoginCtrl = expressAsynsHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (userFound && userFound.isPasswordMatched(password)) {
    res.json(userFound);
  } else {
    res.status(401);
    throw new Error("Sai tên hoặc mật khẩu");
  }
});

module.exports = { userRegisterCtrl, userLoginCtrl };
