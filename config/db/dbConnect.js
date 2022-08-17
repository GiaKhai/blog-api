const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Kết nối thành công");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
