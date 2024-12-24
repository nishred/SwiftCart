import exp from "constants";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const NODE_ENV = process.env.NODE_ENV;

const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

const JWT_EXPIRY = process.env.JWT_EXPIRY;

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;

const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

const AWS_REGION = process.env.AWS_REGION;

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

export {
  PORT,
  NODE_ENV,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRY,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  AWS_REGION,
  S3_BUCKET_NAME,
};
