import exp from "constants";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const NODE_ENV = process.env.NODE_ENV;

const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

const JWT_EXPIRY = process.env.JWT_EXPIRY;

export { PORT, NODE_ENV, MONGO_URI, JWT_SECRET, JWT_EXPIRY };
