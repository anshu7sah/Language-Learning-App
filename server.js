const app = require("./app");
const mongoose = require("mongoose");
//Handling unCaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Sutting dowm the server due to uncaught Exception`);
  process.exit(1);
});

//Config
require("dotenv").config();
const DATABASE = process.env.DATABASE;

//DB Connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("COnnection Successful");
  })
  .catch((err) => {
    console.log(`Connection Failed: ${err}`);
  });
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//unHandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Sutting dowm the server due to unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
