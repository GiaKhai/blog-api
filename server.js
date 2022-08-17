const express = require("express");
const dbConnect = require("./config/db/dbConnect");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const userRouters = require("./route/users/usersRoute");

const app = express();

//connect db
dbConnect();

app.use(express.json());

//user router
app.use("/api/users", userRouters);

//handler
app.use(errorHandler);
app.use(notFound);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running port ${PORT}`));
