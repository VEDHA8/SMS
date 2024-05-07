import mongoose from "mongoose";
import config from "../config";
import logger from "./logger";

let database;

// Connect to the database
const connectDB = async () => {
  const mongodb_url = config.Mongodb_url;
  if (database) {
    return;
  }
  mongoose
    .connect(mongodb_url)
    .then((connection) => {
      database = connection;
      logger.info("Database connection successful");
    })
    .catch((error) => {
      logger.error("Database connection failed");
    });
};

export default connectDB;
