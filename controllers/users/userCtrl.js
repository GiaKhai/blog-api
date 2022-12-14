const User = require("../../model/user/User");
const expressAsynsHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const sgMail = require("@sendgrid/mail");
const validateMongodbId = require("../utils/validateMongodbID");

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

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
    res.json({
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      email: userFound.email,
      profilePhoto: userFound.profilePhoto,
      isAdmin: userFound.isAdmin,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error("Sai tên hoặc mật khẩu");
  }
});

//fetch all user
const fetchUserCtrl = expressAsynsHandler(async (req, res) => {
  console.log(req.headers);
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

//fetch detail user
const fetchDetailUserCtrl = expressAsynsHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const users = await User.findById(id);
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

//profile user
const profileUserCtrl = expressAsynsHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const profile = await User.findById(id);
    res.json(profile);
  } catch (error) {
    res.json(error);
  }
});

//update profile user
const updateProfileUserCtrl = expressAsynsHandler(async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, bio } = req.body;
  validateMongodbId(id);
  try {
    const profile = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        bio,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(profile);
  } catch (error) {
    res.json(error);
  }
});

//delete user
const deleteUserCtrl = expressAsynsHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json(deleteUser);
  } catch (error) {
    res.json(error);
  }
});

//update password

const updateUserPasswordCtrl = expressAsynsHandler(async (req, res) => {
  const { id } = req.user;
  const { password } = req.body;
  validateMongodbId(id);
  const user = await User.findById(id);
  if (password) {
    user.password = password;
    const updateUser = await user.save();
    res.json(updateUser);
  }
  res.json(user);
});

//send mail
const generateVerificationTokenCtrl = expressAsynsHandler(async (req, res) => {
  try {
    const msg = {
      to: "khaigia11111@gmail.com", // Change to your recipient
      from: "nguyendinhgiakhai@gmail.com", // Change to your verified sender
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    await sgMail.send(msg);
    res.json("Email send");
    console.log("123");
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  fetchUserCtrl,
  deleteUserCtrl,
  fetchDetailUserCtrl,
  profileUserCtrl,
  updateProfileUserCtrl,
  updateUserPasswordCtrl,
  generateVerificationTokenCtrl,
};
