const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
import "dotenv/config";
import logger from "./common/utils/logger";
import connectDB from "./common/utils/DBconnection";

const app = express();

const PORT = process.env.PORT || "8080"; //port

//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//routes
/* app.use("/CMS/", require("./CMS/routes/testRoutes"));
app.use("/common/", require("./common/routes/testCommonRoutes")); */

app.get("/", (req, res) => {
  res.send("welcome to the Student Management System");
});

//server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);

  connectDB();
});
