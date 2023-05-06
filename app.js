const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
const userRoute = require("./routes/userRoute");

const app = express();
app.use(cors());
const errorMiddleware = require("./middleware/error");
app.use(express.json());
app.use(cookieParser());

//Route Import
readdirSync("./routes").map((e) => app.use("/", require("./routes/" + e)));

app.use("/api", userRoute);

//middleware for Error
app.use(errorMiddleware);
module.exports = app;
